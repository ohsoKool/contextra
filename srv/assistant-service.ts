// @ts-expect-error: @sap/cds has no bundled TypeScript declarations in this project
import cds from "@sap/cds";

export default cds.service.impl(async function (this: cds.Service) {
  this.on("ask", async (req: cds.Request) => {
    const { question } = req.data;

    console.log("Question received:", question);

    return `CAP received your question: ${question}`;
  });
});
