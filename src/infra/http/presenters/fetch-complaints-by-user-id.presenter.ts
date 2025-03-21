import { Complaint } from "src/domain/report/enterprises/entities/complaint";

export class FetchComplaintsByUserIdPresenter {
    static toHttp(complaints: Complaint[]) {
        const fetchComplaints = complaints.map((complaint) => {
            return {
                id: complaint.id.toValue,
                description: complaint.props.description,
                location: complaint.props.location,
                status: complaint.props.status,
                createdAt: complaint.props.createdAt,
                userId: complaint.props.userId.toValue,
                moderator: complaint.moderatorId?.toValue ?? ''
            }
        })

        return fetchComplaints
    }
}