import express from 'express';
import { auth } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';
import { ROLES } from '../config/constants.js';
import upload from '../middleware/multer.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  validateProduct,
  handleValidationErrors
} from '../controllers/productController.js';

const router = express.Router();

// multiple images
const productUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'image360', maxCount: 1 }
]);

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes - Admin/Manager only
router.post(
  '/', 
  auth, 
  checkRole(ROLES.ADMIN, ROLES.MANAGER), 
  productUpload,
  validateProduct,
  handleValidationErrors,
  createProduct
);

router.put(
  '/:id', 
  auth, 
  checkRole(ROLES.ADMIN, ROLES.MANAGER), 
  productUpload,
  validateProduct,
  handleValidationErrors,
  updateProduct
);

router.delete(
  '/:id', 
  auth, 
  checkRole(ROLES.ADMIN), 
  deleteProduct
);

export default router;