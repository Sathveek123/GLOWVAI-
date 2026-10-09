import assert from "node:assert";
import test, { describe } from "node:test";
import { SITE_URL, getAbsoluteUrl } from "../lib/site-url";
import { seoCategoryCopy } from "../config/seo-copy";
import { sampleProducts } from "../config/products";

describe("Technical SEO Build Suite", () => {
  test("SITE_URL single source of truth resolves to https://glowvai.in without trailing slash", () => {
    assert.strictEqual(SITE_URL, "https://glowvai.in");
    assert.ok(!SITE_URL.endsWith("/"));
  });

  test("getAbsoluteUrl generates clean full URLs without duplicate slashes", () => {
    assert.strictEqual(getAbsoluteUrl("/shop"), "https://glowvai.in/shop");
    assert.strictEqual(getAbsoluteUrl("face-analysis"), "https://glowvai.in/face-analysis");
    assert.strictEqual(getAbsoluteUrl("/"), "https://glowvai.in");
  });

  test("SEO copy titles and descriptions contain zero em-dashes", () => {
    Object.entries(seoCategoryCopy).forEach(([, copy]) => {
      assert.ok(!copy.title.includes("—"));
      assert.ok(!copy.metaDescription.includes("—"));
      assert.ok(!copy.h1.includes("—"));
      assert.ok(!copy.intro.includes("—"));
    });
  });

  test("Product SEO fields do not reference localhost or glowvai.com", () => {
    sampleProducts.forEach((p) => {
      assert.ok(!p.seo.title.includes("localhost"));
      assert.ok(!p.seo.title.includes("glowvai.com"));
      assert.ok(!p.seo.description.includes("localhost"));
      assert.ok(!p.seo.description.includes("glowvai.com"));
      p.images.forEach((img) => {
        assert.ok(!img.includes("localhost"));
        assert.ok(!img.includes("glowvai.com"));
      });
    });
  });

  test("SEO Meta descriptions fit within optimal 50-170 character boundary", () => {
    Object.entries(seoCategoryCopy).forEach(([, copy]) => {
      assert.ok(copy.metaDescription.length >= 50);
      assert.ok(copy.metaDescription.length <= 170);
    });
  });
});
