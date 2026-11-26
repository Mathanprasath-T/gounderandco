import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Enquiry from '../models/Enquiry.js';
import { isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure local data store directory exists
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(ENQUIRIES_FILE);
    } catch {
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring enquiries.json exists:', err.message);
  }
}

/**
 * POST /api/enquiries
 * Handle new showroom customer enquiry
 */
export async function createEnquiry(req, res, next) {
  try {
    const { name, phone, category, product, message } = req.body;

    const enquiryPayload = {
      name: name.trim(),
      phone: phone.trim(),
      category: category ? category.trim() : 'General Enquiry',
      product: product ? product.trim() : '',
      message: message ? message.trim() : '',
      source: 'Website Contact Form',
      createdAt: new Date().toISOString(),
    };

    let savedRecord;

    // Check if MongoDB is connected
    if (isDbConnected()) {
      savedRecord = await Enquiry.create(enquiryPayload);
      console.log(`[Enquiry Logged to MongoDB] ID: ${savedRecord._id} | Customer: ${name} (${phone})`);
    } else {
      // Resilient local file persistence fallback
      await ensureDataFile();
      const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8').catch(() => '[]');
      const list = JSON.parse(raw || '[]');
      const localRecord = {
        _id: 'local_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...enquiryPayload,
      };
      list.unshift(localRecord);
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
      savedRecord = localRecord;
      console.log(`[Enquiry Logged to File] ID: ${localRecord._id} | Customer: ${name} (${phone})`);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received by Gounder & Co.',
      data: {
        id: savedRecord._id,
        name: savedRecord.name,
        phone: savedRecord.phone,
        category: savedRecord.category,
        product: savedRecord.product,
        createdAt: savedRecord.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/enquiries
 * Retrieve showroom enquiries (for internal review)
 */
export async function getEnquiries(req, res, next) {
  try {
    if (isDbConnected()) {
      const list = await Enquiry.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: list.length, data: list });
    } else {
      await ensureDataFile();
      const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8').catch(() => '[]');
      const list = JSON.parse(raw || '[]');
      return res.json({ success: true, count: list.length, data: list, storage: 'local_file' });
    }
  } catch (err) {
    next(err);
  }
}

