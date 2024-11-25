import Visitor from "../models/visitor.js";

const VisitorController = {
  getAll: async (req, res) => {
    try {
      const visitors = await Visitor.findAll();
      res.status(200).json(visitors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching visitors", error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const visitor = await Visitor.findByPk(id);
      if (!visitor) return res.status(404).json({ message: "Visitor not found" });
      res.status(200).json(visitor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching visitor", error });
    }
  },

  create: async (req, res) => {
    try {
      const newVisitor = await Visitor.create(req.body);
      res.status(201).json(newVisitor);
    } catch (error) {
      res.status(500).json({ message: "Error creating visitor", error });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Visitor.update(req.body, { where: { id } });
      if (!updated) return res.status(404).json({ message: "Visitor not found" });
      const updatedVisitor = await Visitor.findByPk(id);
      res.status(200).json(updatedVisitor);
    } catch (error) {
      res.status(500).json({ message: "Error updating visitor", error });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Visitor.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: "Visitor not found" });
      res.status(200).json({ message: "Visitor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting visitor", error });
    }
  },
};

export default VisitorController;
