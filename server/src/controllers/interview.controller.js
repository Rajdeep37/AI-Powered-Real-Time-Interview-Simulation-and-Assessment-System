import { Interview } from "../models/interview.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//new interview
const scheduleInterview= asyncHandler(async(req,res)=>{
    const {candidateUsername,expertUsername}=req.body;
    if(!candidateUsername || !expertUsername){
        throw new ApiError(400,"All fields are required")
    }
    const candidate= await User.findOne({username:candidateUsername})
    

    const expert= await User.findOne({username:expertUsername})

    if(!candidate|| !expert){
        throw new ApiError(404,"Not Found")
    }

    const candidateId=candidate._id
    const expertId=expert._id
    
    const newInterview=Interview.create(
        {
            candidateId:candidateId,
            expertId:expertId,
            questions:[],
            responses:[],
            expertScores:[],
            overallScore:0,
            feedback:"",
        }
    )

    if(!newInterview){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(201,{newInterview},"New Interview Scheduled Successfully"))
})


const getScheduledInterviews= asyncHandler(async(_,res)=>{
    const scheduledInterviews=await Interview.find({
        status:"Scheduled"
    })
    if(!scheduledInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{scheduledInterviews},"List of scheduled interviews fetched successfully"))
})

const getCompletedInterviews= asyncHandler(async(_,res)=>{
    const completedInterviews=await Interview.find({
        status:"Completed"
    })
    if(!completedInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{completedInterviews},"List of scheduled interviews fetched successfully"))
})

const getPendingInterviews= asyncHandler(async(_,res)=>{
    const pendingInterviews=await Interview.find({
        status:"Pending Evaluation"
    })
    if(!pendingInterviews){
        throw new ApiError(500,"Something went wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{pendingInterviews},"List of scheduled interviews fetched successfully"))
})



export {scheduleInterview,getScheduledInterviews,getCompletedInterviews,getPendingInterviews};