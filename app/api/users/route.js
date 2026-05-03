import clientPromise from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const form = body.form;

    const client = await clientPromise;
    const db = client.db("Wedding");

    // 🔍 Check if mobile already exists
    const existing = await db.collection("Hari_Wedding").findOne({
      phone: form.phone,
    });

    if (existing) {
      return Response.json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    // ✅ Insert if not exists
    const result = await db.collection("Hari_Wedding").insertOne({
      ...form,
      guests: Number(form.guests),
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}