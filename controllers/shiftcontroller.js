
const shift = require('../models/Shift');

const getAllshift = async(req,res) =>{
try{
    const getshift = await shift.find({status:'Available'});
    console.log("Shifts retrieved from DB:", getshift);
    res.status(200).json(getshift);
}catch(error){
    res.status(500).json({ message: 'Error fetching Shift' });
}
   };

const bookShift = async(req,res) =>{
    console.log("Request body received:", req.body);
    const {ShiftId} = req.body;
    const userId = req.user?.id;
   
    console.log("user id",userId);
  // Validate request inputs
  if (!ShiftId) {
    return res.status(400).json({ message: 'ShiftId is required' });
  }
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User not logged in' });
  }
    try {
        const shifts = await shift.findById(ShiftId);
        console.log("shifts",shifts);
        if(shifts.status!='Available'){
            return res.status(400).json({ message: 'Shift is not available' });
        }
        shifts.status = 'Booked';
        shifts.userId = userId;
        await shifts.save();
        res.status(200).json({ message: 'Shift booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking shift' });
    }
}

module.exports ={getAllshift,bookShift} 