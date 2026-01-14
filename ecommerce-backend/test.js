import mongoose from "mongoose";
import slugify from "slugify";
import Product from "../models/Product.js";


mongoose.connect("mongodb://localhost:27017/myDatabase");

async function addSlugsToOldProducts() {
  try {
    const products = await Product.find({
      $or: [{ slug: { $exists: false } }, { slug: "" }]
    });

    for (let product of products) {
      const baseSlug = slugify(product.name, {
        lower: true,
        strict: true
      });

      let slug = baseSlug;
      let count = 1;

      while (await Product.findOne({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }

      product.slug = slug;
      await product.save();
    }

    console.log(`Slugs added to ${products.length} old products`);
    process.exit(0);

  } catch (error) {
    console.error("Error adding slugs:", error);
    process.exit(1);
  }
}

addSlugsToOldProducts();