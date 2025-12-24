import { NextRequest, NextResponse } from "next/server";
import Article from "@/src/models/article";
import slugify from "@/src/utils/slugify";

// GET: List articles with pagination, filtering, search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

    const where: any = { deletedAt: null };
    if (search) {
      where.title = { $iLike: `%${search}%` };
    }
    if (status) {
      where.status = status;
    }

    // @ts-ignore: $iLike is supported by Sequelize
    const { rows, count } = await Article.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json({
      data: rows,
      meta: { page, limit, total: count },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST: Create new article
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );
    }
    const slug = slugify(body.title);
    const article = await Article.create({
      title: body.title,
      slug,
      content: body.content,
      status: body.status || "draft",
      metadata: body.metadata || {},
    });
    return NextResponse.json({ data: article });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

// PUT: Update article (expects id in body)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "Article id required" },
        { status: 400 }
      );
    }
    const article = await Article.findByPk(body.id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    if (body.title) article.title = body.title;
    if (body.title) article.slug = slugify(body.title);
    if (body.content) article.content = body.content;
    if (body.status) article.status = body.status;
    if (body.metadata) article.metadata = body.metadata;
    await article.save();
    return NextResponse.json({ data: article });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete article (expects id in body)
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "Article id required" },
        { status: 400 }
      );
    }
    const article = await Article.findByPk(body.id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    await article.destroy();
    return NextResponse.json({ message: "Article deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
