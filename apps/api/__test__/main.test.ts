import request from 'supertest';
import express from 'express';
import fs from 'fs';

jest.mock('fs'); // Mock the file system

describe('API Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();

    app.get('/api/data', (req, res) => {
      const { page = 1, limit = 10 } = req.query;
      const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
      const start = ((page as number) - 1) * (limit as number);
      const end = (start as number) + (limit as number);

      res.json({
        totalItems: data.length,
        limit: parseInt(limit as string, 10),
        totalPages: Math.ceil(data.length / (limit as number)),
        currentPage: parseInt(page as string, 10),
        items: data.slice(start, end),
      });
    });
  });

  test('GET REQUESTS', async () => {
    const mockData = [
      {
        id: '106aaa8c-79c1-4426-b77d-a7dbe33bd7cb',
        title: 'Environmental Law Advisory and Representation Services',
        author: 'Michael Williams',
        createdAt: 1719783700,
        published: false,
        auction: false,
      },
      {
        id: '7a51a54f-84e1-43d3-a5f0-2a459ab3c9a2',
        title: 'Legal Consultancy for Public-Private Partnership Agreements',
        author: 'Linda Rodriguez',
        createdAt: 1710478394,
        published: false,
        auction: true,
      },
      {
        id: '605e4f25-d498-4a42-a2d1-5cb49a17696e',
        title: 'Intellectual Property Management and Litigation Support',
        author: 'Elizabeth Hernandez',
        createdAt: 1710593530,
        published: false,
        auction: true,
      },
    ];

    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));

    const response = await request(app).get('/api/data?page=1&limit=2');

    expect(response.status).toBe(200);
    expect(response.body.totalItems).toBe(3);
    expect(response.body.limit).toBe(2);
    expect(response.body.totalPages).toBe(2);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].id).toBe(
      '106aaa8c-79c1-4426-b77d-a7dbe33bd7cb'
    );
  });
});
