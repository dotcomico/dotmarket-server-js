import express from 'express';
import { auth } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';
import { ROLES } from '../config/constants.js';
import { 
  createCategory, 
  getCategoryTree,
  getAllCategories,
  getProductsByCategory,
  getCategoryBySlug
} from '../controllers/categoryController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Public routes
router.get('/tree', getCategoryTree);
router.get('/:slug', getCategoryBySlug);
router.get('/:slug/products', getProductsByCategory);

// Protected routes (Admin/Manager only)
router.post('/', 
  auth, 
  checkRole(ROLES.ADMIN, ROLES.MANAGER),
  upload.single('image'), 
  createCategory
);

export default router;