export interface CreateInquiryInput {
  property_id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  inquiry_type: "GENERAL";
}
