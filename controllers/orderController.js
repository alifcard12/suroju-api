import Order from "../models/orderModel.js";
import createError from "../utils/createError.js";

// Mengambil semua order
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Menambahkan order baru
export const addOrder = async (req, res, next) => {
  try {
    const { domain, tema, paket } = req.body;

    // Mendapatkan ID pengguna yang terautentikasi
    const userId = req.userId;

    // Membuat objek order baru
    const order = new Order({
      userId,
      domain,
      tema,
      paket,
    });

    // Menyimpan order ke basis data
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// Mengedit order berdasarkan ID
export const editOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { domain, tema, paket } = req.body;

    // Mencari order berdasarkan ID
    const order = await Order.findById(id);

    if (!order) {
      return next(createError(404, "Order tidak ditemukan"));
    }

    // Mengupdate data order
    order.domain = domain;
    order.tema = tema;
    order.paket = paket;

    // Menyimpan perubahan ke database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Menghapus order berdasarkan ID
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus order berdasarkan ID
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return next(createError(404, "Order tidak ditemukan"));
    }

    res.json({ message: "Order berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengubah status order berdasarkan ID
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Mencari order berdasarkan ID
    const order = await Order.findById(id);

    if (!order) {
      return next(createError(404, "Order tidak ditemukan"));
    }

    // Mengupdate status order
    order.status = status;

    // Menyimpan perubahan ke database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Mendapatkan order berdasarkan domain
// Mendapatkan order berdasarkan domain
export const getOrder = async (req, res, next) => {
  try {
    const { domain } = req.params;

    // Mencari order berdasarkan domain
    const order = await Order.findOne({ domain });

    if (!order) {
      return next(createError(404, "Order tidak ditemukan"));
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
