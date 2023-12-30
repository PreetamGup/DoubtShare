import DoubtModel from "../model/DoubtModel.js";
import User from '../model/UserModel.js'




const doubtController = {

    createDoubt : async (req,res)=>{
       
        const {doubt, subject, topic, studentId, language, classGrade} = req.body
        if(!doubt || !subject || !studentId){

            return res.status(200).json({
                success:false,
                message:"Subject Or Doubt is not added"
            })
        }


       try {
        //creating new doubt
        const newDoubt = new DoubtModel({doubt, subject, topic, studentId});
        await newDoubt.save();

        //sending Notification to all teacher with same subject
        sendNotificationToTeachers(subject,topic, language, classGrade)

        return res.status(201).json({
            success:true,
            message:"Doubt created"
        })

       } catch (error) {

        console.error("Error creating doubt:", error);
        return res.status(500).json({ error: "Internal Server Error" });
       
    }

    },


    allDoubts : async (req, res)=>{
         
      try {
        const{id} = req.params
        const {subject, sortBy} = req.query;
        
        const filter ={
          studentId:id
        }

        const sorting={}

        if(subject) filter.subject=subject;
        
        if(sortBy) sorting.createdAt=sortBy==="recent"?-1:1;
        
        
        const allDoubt = await DoubtModel.find(filter).sort(sorting);
        
        return res.status(200).json({
          messgage:"All doubt of student",
          success:true,
          allDoubt
        })

      } catch (error) {
        console.error("Error creating doubt:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

    }
}














const sendNotificationToTeachers = async (subject, topic, language, classGrade) => {
    try {
      // Find teachers with the same subject as the doubt
      const filter ={
        role:"tutor",
        subject,
        language,
        allowedClass:{ $all: classGrade }
      }
         
      const teachers = await User.find(filter).exec();

      // Send notifications to each teacher
      teachers.forEach(async (teacher) => {
        teacher.notification.push({
          message: `New doubt in ${topic}`,
          isRead: false,
        });
        await teacher.save();
      });

    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };
  

export default doubtController;