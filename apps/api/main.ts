import express from "express";
import cors from "cors"
import fs from "fs";
import path from "path";


const app = express();
const port = 3001;

// Middlewares
app.use(cors())

// Routes
app.get("/", (_, res) => {
  res.send("Hello world!")
});
const readJSONFile = (filePath: string) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

app.get('/api/data', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const filePath = path.join(__dirname, 'requests-data.json');

  const items = readJSONFile(filePath);
  items.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); 
  });
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedItems = items.slice(startIndex, endIndex);
  
  res.json({
      totalItems: items.length,
      limit: limit,
      totalPages: Math.ceil(items.length / limit),
      currentPage: page,
      items: paginatedItems
  });
});


// App start
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});