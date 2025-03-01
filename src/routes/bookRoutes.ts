import express, { Request, Response } from "express";
import Book from "../models/Book";

const router = express.Router();

// 📌 1️⃣ 책 목록 조회 (서버사이드 페이지네이션 + 제목 & 저자 필터링)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", title, author } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    let query: any = {}; // 기본 검색 조건

    if (title) query.title = { $regex: new RegExp(title as string, "i") };
    if (author) query.author = { $regex: new RegExp(author as string, "i") };

    const books = await Book.find(query).skip(skip).limit(limitNumber);
    const total = await Book.countDocuments(query);

    res.json({
      books,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 📌 2️⃣ 책 상세 정보 조회
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 📌 3️⃣ 책 추가 (프론트엔드에서 크롤링한 데이터 저장)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, author, thumbnail, summary } = req.body;
    const book = new Book({ title, author, thumbnail, summary });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 📌 4️⃣ 책 정보 수정
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 📌 5️⃣ 책 삭제
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }
    res.json({ message: "책이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

export default router;
