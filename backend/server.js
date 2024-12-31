const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import fs module
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Check and create uploads directory
const uploadsDir = path.join(__dirname, '/image');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create uploads directory if it doesn't exist
}

// Multer configuration to store uploaded files in the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// MongoDB connection
mongoose.connect('mongodb+srv://rssanjiv8:sa532003@cluster0.sb144.mongodb.net/youtown?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if MongoDB is unreachable
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// product schema definition
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  order: {
    type: String,
    default: null,
  },
  Category: {
    type: String,
    default: null,
  },
  subCategory: {
    type: String,
    default: null,
  },
  Vendor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Business',
    default: null,
  },
  Qty: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    default: null,
  },
  imagePath: {
    type: String,
    default: null,
  },
  
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Item = mongoose.model('product', ItemSchema);

// Business schema definition
const BusinessSchema = new mongoose.Schema({
  Businessname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },

  Category: {
    type: String,
    default: null,
  },
  open: {
    type: String,
    default: null,
  },
  close: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  phone1: {
    type: String,
    default: null,
  },
  phone2: {
    type: String,
    default: null,
  },
  Vender:
    {     type: String,
      default: null,  },
  Address: {
    type: String,
    default: null,
  },
  City: {
    type: String,
    default: null,
  },
  District: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: "Tamil Nadu",
  },
  country: {
    type: String,
    default: "India",
  },
  Postcode: {
    type: String,
    default: null,
  },
  Lng: {
    type: String,
    default: null,
  },
  Lat: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  userImage: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Business = mongoose.model('Business', BusinessSchema);

// -----------------------------------directory-------------------------
const DirectorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },

  Category: {
    type: String,
    default: null,
  },
  open: {
    type: String,
    default: null,
  },
  close: {
    type: String,
    default: null,
  },
 
  phone1: {
    type: String,
    default: null,
  },
  phone2: {
    type: String,
    default: null,
  },
  Address: {
    type: String,
    default: null,
  },
  City: {
    type: String,
    default: null,
  },
  District: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: "Tamil Nadu",
  },
  country: {
    type: String,
    default: "India",
  },
  Postcode: {
    type: String,
    default: null,
  },
  Lng: {
    type: String,
    default: null,
  },
  Lat: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  userImage: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Directory = mongoose.model('Directory', DirectorySchema);

// -----------------------------------JOB-------------------------
const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },

  Category: {
    type: String,
    default: null,
  },
  Jobtype: {
    type: String,
    default: null,
  },
  OfferedSalarymin: {
    type: String,
    default: null,
  },
 
  OfferedSalaryMAX: {
    type: String,
    default: null,
  },
  Experience: {
    type: String,
    default: null,
  },
  Gender: {
    type: String,
    default: null,
  },
  Qualification: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  }, 
  Vendor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Business',
    default: null,
  },
  Website: {
    type: String,
    default: null,
  },
  Address: {
    type: String,
    default: null,
  },
  City: {
    type: String,
    default: null,
  },
  District: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: "Tamil Nadu",
  },
  country: {
    type: String,
    default: "India",
  },
  Postcode: {
    type: String,
    default: null,
  },

  StartDate: {
    type: String,
    default: null,
  },
  EndDate: {
    type: String,
    default: null,
  }
 
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const JOB = mongoose.model('Job',  JobSchema);

// -----------------------------------JOB-------------------------
const JOBApplySchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  Intrested: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },

  Category: {
    type: String,
    default: null,
  },
  Jobtype: {
    type: String,
    default: null,
  },

  Experience: {
    type: String,
    default: null,
  },
  Gender: {
    type: String,
    default: null,
  },
  Qualification: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  }, 
  phone1: {
    type: String,
    default: null,
  }, 
  Vendor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Job',
    default: null,
  },
 
  Address: {
    type: String,
    default: null,
  },
  resume: {
    type: String,
    default: null,
  },
  Image: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const JOBApply = mongoose.model('JOBApply',  JOBApplySchema);
// -------------property---------------------------------
const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  order: {
    type: String,
    default: null,
  },
  Category: {
    type: String,
    default: null,
  },
  Vendor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Business',
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    default: null,
  },
  imagePath: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, 
});

const Property = mongoose.model('property', PropertySchema);

// ------------------Category--------------------------------------
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },

  type: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Category = mongoose.model('category', categorySchema);


// -------------Login up--------------

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, 
});

const Login = mongoose.model('Admin_Login', LoginSchema);

// ------------- USER Logi up--------------

const UserLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  phone:{
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  }
}, {
  timestamps: true,
});

const UserLogin = mongoose.model('User_Login', UserLoginSchema);

// ------------- Business Logi up--------------

const BusinessLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  phone1:{
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  businessId:
  {     type: String,
    default: null,  },
}, {
  timestamps: true,
});

const BusinessLogin = mongoose.model('Business_Login', BusinessLoginSchema);

// ---------------sub category---------------------

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },

  type: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const subCategory = mongoose.model('subcategory', subcategorySchema);



// ----------------------property----------------------------------------------------------------

app.post('/property', upload.single('image'), async (req, res) => {
  try {
    const { name, description, order, Category, Vendor, size, price } = req.body;


    const imagePath = req.file ? req.file.path.replace('E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\', '') : null;

    // Create a new item
    const newItem = new Property({
      name,
      description,
      order,
      Category,
      Vendor,
      size,
      price,
      imagePath,
    });


    const savedItem = await newItem.save();


    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});


app.use('/image', express.static(path.join(__dirname, '/image')));

// ----------------------------------Property Edit--------------------------------------------------

app.put('/propertyEdit/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, order, Category, Vendor, size, price } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    // Find and update the item
    const updatedItem = await Property.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        order,
        Category,
        Vendor,
        size,
        price,
        ...(imagePath && { imagePath })
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----------------------Property delete----------------------------------------------------
app.delete('/PropertyDelet/:id', async (req, res) => {
  try {
    const deletedItem = await Property.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------------product---------------------------------------------------------------------------

app.post('/product', upload.single('image'), async (req, res) => {
  try {
    const { name, description, order, Category, subCategory, Qty, price,Vendor } = req.body;


    const imagePath = req.file ? req.file.path.replace('E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\', '') : null;

    // Create a new item
    const newItem = new Item({
      name,
      description,
      order,
      Category,
      subCategory,
      Qty,
      price,
      Vendor,
      imagePath,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});
app.use('/image', express.static(path.join(__dirname, '/image')));

// ----------------------------------Product Edit---------------------------------

app.put('/productEdit/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, order, Category, subCategory, Qty, price, Vendor } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    // Find and update the item
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        order,
        Category,
        subCategory,
        Qty,
        price,
        Vendor,
        ...(imagePath && { imagePath })
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----------------------Product delete-------------------------------
app.delete('/itemsDelet/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ----------------------job---------------------------------------------------------------------------
app.post('/job', upload.none(), async (req, res) => {
  try {
    console.log("Request Body:", req.body);

  
    const data = JSON.parse(req.body.data);

    console.log("Parsed Data:", data);


    const Job = new JOB({
      ...data,
    });

    const savedJob = await Job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to save job profile." });
  }
});

//---------------------------------------------------Job edit-------------------------------------------------
app.put('/jobEdit/:id', upload.none(), async (req, res) => {
  try {
    const editingItemId = req.params.id;

    // Parse 'data' field from FormData
    const data = JSON.parse(req.body.data);

    console.log('Parsed Data:', data); 


    const updatedJob = await JOB.findByIdAndUpdate(
      editingItemId,
      { $set: data },
      { new: true } 
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job/Property not found.' });
    }

    res.status(200).json({
      message: 'Job/Property updated successfully.',
      updatedJob,
    });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job/property.' });
  }
});

//------------------------------------------------job delet----------------------------------------------------
app.delete('/JobsDelet/:id', async (req, res) => {
  try {
    const deletedItem = await JOB.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ----------------------JobApply---------------------------------------------------------------------------
app.post('/jobapply', upload.fields([{ name: 'resume' }, { name: 'Image' }]), async (req, res) => {
  try {
    console.log(req.files);  // Log the files to debug
    const data = JSON.parse(req.body.data); 

    const baseDir = 'E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\';

    const resumePath = req.files['resume']?.[0]?.path.replace(baseDir, '') || '';
    const userImagePath = req.files['Image']?.[0]?.path.replace(baseDir, '') || '';
    
    if (!resumePath || !userImagePath) {
      return res.status(400).json({ error: 'Resume or image file is missing' });
    }

    // Save the data in MongoDB
    const business = new JOBApply({
      ...data,
      resume: resumePath,
      Image: userImagePath,
    });
    const savedBusiness = await business.save();
    res.status(201).json({ id: business.id, message: 'Business created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save business profile." });
  }
});
//------------------------------------------------job APPLY delet----------------------------------------------------
app.delete('/Jobsapplydelet/:id', async (req, res) => {
  try {
    const deletedItem = await JOBApply.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ----------------------Business---------------------------------------------------------------------------

app.post('/business', upload.fields([{ name: 'logo' }, { name: 'userImage' }]), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); 

    const baseDir = 'E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\';

    const logoPath = req.files['logo']?.[0]?.path.replace(baseDir, '') || '';
    const userImagePath = req.files['userImage']?.[0]?.path.replace(baseDir, '') || '';
    // Save the data in MongoDB
    const business = new Business({
      ...data,
      logo: logoPath,
      userImage: userImagePath,
    });
    const savedBusiness = await business.save();
    res.status(201).json({ id: business.id, message: 'Business created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save business profile." });
  }
});

// -----------------------------------------business edit---------------------------------
app.put('/businessEdit/:id', upload.fields([{ name: 'logo' }, { name: 'userImage' }]), async (req, res) => {
  const businessId = req.params.id;

  try {

    const data = JSON.parse(req.body.data);
    const baseDir = 'E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\';
    // Build update object
    const updateFields = {
      Businessname: data.Businessname,
      description: data.description,
      email: data.email,
      Category: data.Category,
      open: data.open,
      close: data.close,
      name: data.name,
      phone1: data.phone1,
      phone2: data.phone2,
      Address: data.Address,
      City: data.City,
      District: data.District,
      state: data.state,
      country: data.country,
      Postcode: data.Postcode,
      Lat: data.Lat,
      Lng: data.Lng,
    };

    // Add file paths if files are uploaded
    if (req.files.logo) {
      updateFields.logo = req.files.logo[0].path.replace(baseDir, '');
    }
    if (req.files.userImage) {
      updateFields.userImage = req.files.userImage[0].path.replace(baseDir, '');
    }

    // Update the business entry in the database
    const updatedBusiness = await Business.findByIdAndUpdate(businessId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ message: 'Business updated successfully', data: updatedBusiness });
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ------------------------------------------business Remove-----------------------------------------
app.delete('/businessDelet/:id', async (req, res) => {
  try {
    const deletedItem = await Business.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------------------Directory---------------------------------------
app.post('/dirctory', upload.fields([{ name: 'logo' }]), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); 

    const baseDir = 'E:\\sanjiv\\REACT JS\\youtown react\\youtown react\\backend\\image\\';

    const logoPath = req.files['logo']?.[0]?.path.replace(baseDir, '') || '';
    
    // Save the data in MongoDB
    const business = new Directory({
      ...data,
      logo: logoPath,
    });
    const savedBusiness = await business.save();
    res.status(201).json(savedBusiness);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save business profile." });
  }
});

// -----------------------------------------Directory edit---------------------------------
app.put('/directoryEdit/:id', upload.fields([{ name: 'logo' }]), async (req, res) => {
  const businessId = req.params.id;

  try {

    const data = JSON.parse(req.body.data);

    // Build update object
    const updateFields = {
      name: data.name,
      description: data.description,
      email: data.email,
      Category: data.Category,
      open: data.open,
      close: data.close,
      phone1: data.phone1,
      phone2: data.phone2,
      Address: data.Address,
      City: data.City,
      District: data.District,
      state: data.state,
      country: data.country,
      Postcode: data.Postcode,
      Lat: data.Lat,
      Lng: data.Lng,
    };

    // Add file paths if files are uploaded
    if (req.files.logo) {
      updateFields.logo = req.files.logo[0].path;
    }
    if (req.files.userImage) {
      updateFields.userImage = req.files.userImage[0].path;
    }

    // Update the business entry in the database
    const updatedBusiness = await Directory.findByIdAndUpdate(businessId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ message: ' Directory updated successfully', data: updatedBusiness });
  } catch (error) {
    console.error('Error updating  Directory:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
//------------------------------------------directory remove--------------------------------------------
app.delete('/directoryDelet/:id', async (req, res) => {
  try {
    const deletedItem = await  Directory.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------catgory ----------------------------//

app.post("/category", (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: "Both name and type are required" });
  }


  const newCategory = new Category({
    name,
    type,
  });
  newCategory.save()
    .then(category => {
      res.status(201).json({
        message: "Category created successfully",
        category,
      });
    })
    .catch(err => {
      console.error("Error saving category:", err);
      res.status(500).json({ error: "Error saving category" });
    });
});


//-----------------------category Edit---------------------------//
app.post("/CategoryEdit/:id?", async (req, res) => {
  const { id } = req.params; 
  const { name, type } = req.body;

  // Validate input
  if (!name || !type) {
    return res.status(400).json({ error: "Both 'name' and 'type' are required" });
  }

  try {
    if (id) {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, type },
        { new: true, runValidators: true } 
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      return res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    }
    const newCategory = new Category({ name, type });
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error processing category:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid data provided", details: error.errors });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});
//----------------------------delet category-----------------------------------
app.delete('/categoryDelet/:id', async (req, res) => {
  try {
    const deletedItem = await  Category.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------subcatgory ----------------------------//

app.post("/subcategory", (req, res) => {
  const { name, type } = req.body;


  if (!name || !type) {
    return res.status(400).json({ error: "Both name and type are required" });
  }

  // Create a new category
  const newCategory = new subCategory({
    name,
    type,
  });
  newCategory.save()
    .then(category => {
      res.status(201).json({
        message: "Category created successfully",
        category,
      });
    })
    .catch(err => {
      console.error("Error saving category:", err);
      res.status(500).json({ error: "Error saving category" });
    });
});
//----------------------------delet subcategory-----------------------------------
app.delete('/subcategoryDelet/:id', async (req, res) => {
  try {
    const deletedItem = await subCategory.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//-----------------------subcategory Edit---------------------------//
app.post("/SubCategoryEdit/:id?", async (req, res) => {
  const { id } = req.params; 
  const { name, type } = req.body;

  // Validate input
  if (!name || !type) {
    return res.status(400).json({ error: "Both 'name' and 'type' are required" });
  }

  try {
    if (id) {
      const updatedCategory = await subCategory.findByIdAndUpdate(
        id,
        { name, type },
        { new: true, runValidators: true } 
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      return res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    }
    const newCategory = new Category({ name, type });
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error processing category:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid data provided", details: error.errors });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});
// -----------------------Admin sign ----------------------------//

app.post("/sign", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedEmail = await bcrypt.hash(password, 10);
    const login = new Login({
      name,
      email,
      password: hashedEmail,
    });
    await login.save();
    res.status(201).json({
      message: "Login created successfully",
    });
  } catch (err) {
    console.error("Error saving login:", err);
    res.status(500).json({ error: "Error saving login" });
  }
});

// ----------------------------admin login-----------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await Login.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials eamil' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------------------Admin login edit------------------------
app.put('/signEdit/:email', async (req, res) => {
  const userEmail = req.params.email;
  const { name, email, password } = req.body;

  try {

    const updatedUser = await Login.findOneAndUpdate(
      { email: userEmail },
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ----------------------------User Sign--------------------------------------

app.post("/usersign", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedEmail = await bcrypt.hash(password, 10);
    const login = new UserLogin({
      name,
      phone,
      email,
      password: hashedEmail,
    });
    await login.save();
    res.status(201).json({
      message: "Login created successfully",
    });
  } catch (err) {
    console.error("Error saving login:", err);
    res.status(500).json({ error: "Error saving login" });
  }
});

//----------------------------------User Login ----------------------------------------
app.post('/Userlogin', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await UserLogin.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials eamil' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//--------------------------------------Business sign--------------------------------------------

app.post("/Businesssign", async (req, res) => {
  try {
    const { name, email, phone1, password,businessId  } = req.body;
    const hashedEmail = await bcrypt.hash(password, 10);
    const login = new BusinessLogin({
      name,
      phone1,
      email,
      businessId ,
      password: hashedEmail,
    });
    await login.save();
    res.status(201).json({
      message: "Login created successfully",
    });
  } catch (err) {
    console.error("Error saving login:", err);
    res.status(500).json({ error: "Error saving login" });
  }
});
//-------------------------------business login edit--------------------------------
app.put('/businesssignEdit/:email', async (req, res) => {
  const userEmail = req.params.email;
  const { name, email,phone1, password } = req.body;

  try {

    const updatedUser = await BusinessLogin.findOneAndUpdate(
      { email: userEmail },
      { name, email,phone1, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//-----------------------------------------business login---------------------------
app.post('/Businesslogin', async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await BusinessLogin.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials eamil' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// -----------------------get category--------------------------------------------
app.get('/getcatgory', async (req, res) => {
  try {
    const items = await Category.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------get subcategory--------------------------------------------
app.get('/getsubcatgory', async (req, res) => {
  try {
    const items = await subCategory.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------get product----------------
app.get('/getproduct', async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------get property----------------
app.get('/getproperty', async (req, res) => {
  try {
    const items = await Property.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------get vender----------------
app.get('/getAdminlogin', async (req, res) => {
  try {
    const items = await BusinessLogin.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------get business-----------------------
app.get('/getbusiness', async (req, res) => {
  try {
    const items = await Business.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------get Directory-----------------------
app.get('/getdirectory', async (req, res) => {
  try {
    const items = await Directory.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------------get Login-----------------------
app.get('/getLogin', async (req, res) => {
  try {
    const items = await Login.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//------------------------------------------GET BUSINESS PRODUCT-----------------------
app.get('/getbusinessproduct', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Vendor name is required' });
  }

  try {
    const products = await Item.find({ Vendor:name }).populate('Vendor');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

//------------------------------------------GET BUSINESS PORFILE-----------------------
app.get('/getbusinessprofile', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Vendor name is required' });
  }

  try {
    const products = await Business.find({ _id:name });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

//------------------------------------------GET BUSINESS PORPERTY-----------------------
app.get('/GETBusinessProperty', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Vendor name is required' });
  }

  try {
    const property = await Property.find({Vendor:name });
    res.json(property);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


//------------------------------------------GET BUSINESS JOB-----------------------
app.get('/getbusinessjob', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Vendor name is required' });
  }

  try {
    const property = await JOB.find({ Vendor:name });
    res.json(property);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
// -----------------------------get business frontend-----------------------
app.get('/getbusinessfrontend', async (req, res) => {
  try {
    const items = await Business.find().limit(10);
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------get product frontend----------------
app.get('/getproductfrontend', async (req, res) => {
  try {
    const items = await Item.find().limit(10).populate('Vendor');
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------get product frontend----------------
app.get('/getjobfrontend', async (req, res) => {
  try {
    const items = await JOB.find().limit(10).populate('Vendor');
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------get product frontend----------------
app.get('/getpropertyfrontend', async (req, res) => {
  try {
    const items = await Property.find().limit(10).populate('Vendor');
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------get product frontend----------------
app.get('/getjobapplyfrontend', async (req, res) => {
  try {
    const items = await JOBApply.find().limit(10).populate('Vendor');
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -----------------------get directory frontend----------------
app.get('/getdirectoryfrontend', async (req, res) => {
  try {
    const items = await Directory.find().limit(20);
    console.log(items);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// -------------------------------------paymeant-------------------------------------
const SALT_KEY = '4a249dec-af32-4840-93d7-b5cd0c205f7d';
const MERCHANT_ID = 'M1K62VCY22R8';
const BASE_URL = 'https://api.phonepe.com/apis/hermes/pg/v1';
// const SALT_KEY = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
// const MERCHANT_ID = 'PGTESTPAYUAT';
// const BASE_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox';

app.post('/api/phonepe/payment', async (req, res) => {
  const { name, email, mobile, amount } = req.body;

  if (!name || !email || !mobile || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const merchantTransactionId = `MT-${Math.floor(Math.random() * 10000)}`;
  const merchantUserId = `MUID-${crypto.randomBytes(4).toString('hex')}`;

  const paymentData = {
    merchantId: MERCHANT_ID,
    merchantTransactionId,
    merchantUserId,
    amount: amount * 100, // Convert to paise
    redirectUrl: 'http://localhost:3000/payment-response',
    callbackUrl: 'http://localhost:5000/api/phonepe/response',
    mobileNumber: mobile,
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const encodedData = Buffer.from(JSON.stringify(paymentData)).toString('base64');
  const stringToSign = `${encodedData}/pg/v1/pay${SALT_KEY}`;
  const xVerify = `${crypto.createHash('sha256').update(stringToSign).digest('hex')}###1`;

  try {
    const response = await axios.post(`${BASE_URL}/pay`, { request: encodedData }, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
      },
    });

    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
    res.json({ redirectUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

app.post('/api/phonepe/response', async (req, res) => {
  const { merchantId, transactionId, email } = req.body;

 
  const stringToSign = `/pg/v1/status/${merchantId}/${transactionId}${SALT_KEY}`;
  const xVerify = `${crypto.createHash('sha256').update(stringToSign).digest('hex')}###1`;

  try {
 
    const response = await axios.get(`${BASE_URL}/status/${merchantId}/${transactionId}`, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': merchantId,
      },
    });

   
    const paymentStatus = response.data.status; 


    if (paymentStatus === '1') {
  
      const business = await BusinessLogin.find( {email :email});

      if (!business) {
        return res.status(404).json({ error: 'Business not found for this email' });
      }

      business.status = 'Paid';
      await business.save(); 

      return res.json({ message: 'Payment successful, business status updated' });
    } else {
   
      const business = await BusinessLogin.find({email :email});

      if (!business) {
        return res.status(404).json({ error: 'Business not found for this email' });
      }

      business.status = 'Payment Failed';
      await business.save();

      return res.json({ message: 'Payment failed, business status updated' });
    }

  } catch (error) {
    console.error('Error verifying payment status:', error);
    return res.status(500).json({ error: 'Failed to verify payment status' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
