// ================== IMPORT ==================
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ================== IN-MEMORY STORAGE ==================
let idCounter = 1;
let farmers = [];
let crops = [];
let fertilizers = [];
let irrigations = [];
let activity = [];

// ================== HELPER ==================
function logActivity(module, action, details){
  activity.push({
    id: idCounter++,
    date: new Date().toLocaleString(),
    module,
    action,
    details
  });
}

// ================== FRONTEND SERVE ==================

// Serve all frontend files (index, crop, fertilizer, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================== FARMER ROUTES ==================
app.post("/register", (req, res) => {
  const { name, crop, location } = req.body;
  if (!name || !crop || !location) return res.status(400).json({ message: "All fields required!" });
  const farmer = { id: idCounter++, name, crop, location };
  farmers.push(farmer);
  logActivity("Farmer", "Add", `Registered ${name}`);
  res.json({ message: "Farmer Registered Successfully!", farmer });
});
app.get("/farmers", (req, res) => res.json(farmers));

// ================== CROP ROUTES ==================
app.post("/add-crop", (req, res) => {
  const { crop, season, yield: yieldValue } = req.body;
  if (!crop || !season || !yieldValue) return res.status(400).json({ message: "All fields required!" });
  const newCrop = { id: idCounter++, crop, season, yield: yieldValue };
  crops.push(newCrop);
  logActivity("Crop", "Add", `Added crop ${crop}`);
  res.json({ message: "Crop added successfully!", crop: newCrop });
});
app.get("/crops", (req, res) => res.json(crops));
app.put("/update-crop/:id", (req, res) => {
  const { id } = req.params;
  const { crop, season, yield: yieldValue } = req.body;
  const index = crops.findIndex(c => c.id == id);
  if (index === -1) return res.status(404).json({ message: "Crop not found!" });
  crops[index] = { ...crops[index], crop, season, yield: yieldValue };
  logActivity("Crop", "Update", `Updated crop ${crop}`);
  res.json({ message: "Crop updated successfully!", crop: crops[index] });
});
app.delete("/delete-crop/:id", (req, res) => {
  const crop = crops.find(c => c.id == req.params.id);
  crops = crops.filter(c => c.id != req.params.id);
  if(crop) logActivity("Crop", "Delete", `Deleted crop ${crop.crop}`);
  res.json({ message: "Crop deleted successfully!" });
});

// ================== FERTILIZER ROUTES ==================
app.post("/add-fertilizer", (req, res) => {
  const { fertName, type, quantity, appDate } = req.body;
  if (!fertName || !type || !quantity || !appDate) return res.status(400).json({ message: "All fields required!" });
  const fertilizer = { id: idCounter++, fertName, type, quantity, appDate };
  fertilizers.push(fertilizer);
  logActivity("Fertilizer", "Add", `Added ${fertName} (${type})`);
  res.json({ message: "Fertilizer added successfully!", fertilizer });
});
app.get("/fertilizers", (req, res) => res.json(fertilizers));
app.put("/update-fertilizer/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const index = fertilizers.findIndex(f => f.id == id);
  if (index === -1) return res.status(404).json({ message: "Fertilizer not found!" });
  fertilizers[index].quantity = quantity;
  logActivity("Fertilizer", "Update", `Updated ${fertilizers[index].fertName} qty to ${quantity}`);
  res.json({ message: "Fertilizer updated successfully!", fertilizer: fertilizers[index] });
});
app.delete("/delete-fertilizer/:id", (req, res) => {
  const fert = fertilizers.find(f => f.id == req.params.id);
  fertilizers = fertilizers.filter(f => f.id != req.params.id);
  if(fert) logActivity("Fertilizer", "Delete", `Deleted ${fert.fertName}`);
  res.json({ message: "Fertilizer deleted successfully!" });
});

// ================== IRRIGATION ROUTES ==================
app.post("/add-irrigation", (req, res) => {
  const { crop, type, water, lastDate, nextDate } = req.body;
  if (!crop || !water || !lastDate || !nextDate) return res.status(400).json({ message: "All fields required!" });
  const irrigation = { id: idCounter++, crop, type, water, lastDate, nextDate };
  irrigations.push(irrigation);
  logActivity("Irrigation", "Add", `Added ${type} irrigation for ${crop} (${water} L)`);
  res.json({ message: "Irrigation record added!", irrigation });
});
app.get("/irrigations", (req, res) => res.json(irrigations));
app.delete("/delete-irrigation/:id", (req, res) => {
  const irr = irrigations.find(i => i.id == req.params.id);
  irrigations = irrigations.filter(i => i.id != req.params.id);
  if(irr) logActivity("Irrigation", "Delete", `Deleted irrigation for ${irr.crop}`);
  res.json({ message: "Irrigation record deleted!" });
});

// ================== ACTIVITY LOG ==================
app.get("/activity", (req, res) => res.json(activity));
app.delete("/delete-activity/:id", (req, res) => {
  activity = activity.filter(a => a.id != req.params.id);
  res.json({ message: "Activity deleted successfully!" });
});
// ================== SERVER START ==================
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running at http://localhost:${PORT}`));