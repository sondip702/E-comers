import Auth from "../model/auth.model";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    

    try{
        const findUser = await Auth.findOne({email});
        if(findUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Auth({ 
             name,
             email, 
             password=hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully",newUser });

    

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}