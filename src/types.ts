export type Client = {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  adoptionRate: number;
  usageFrequency: string;
  openIssues: number;
  pendingCRs: number;
  paymentStatus: string;
  healthScore: number;
  createdAt: string;
};

export type AdoptionCustomer = {
  id: string;
  customerName: string;
  planned: number;
  soldModules: number;
  liveModules: number;
  activelyUsed: 'Y' | 'N';
  soldPct?: number;
  livePct?: number;
  adoptionScore?: number;
  adoptionColor?: 'green' | 'yellow' | 'red';
};

export type UsageCustomer = {
  id: string;
  customerName: string;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers?: number;
  activeUsersPct?: number;
  transactionsPct: number;
  loginFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rare';
  loginWeight?: number;
  usageScore?: number;
  usageStatus?: 'High' | 'Medium' | 'Low';
  usageColor?: 'green' | 'yellow' | 'red';
};

export type IssueCustomer = {
  id: string;
  customerName: string;
  openTickets: number;
  closedTickets: number;
  totalIssues?: number;
  repeatIssues: number;
  repeatIssuePct?: number;
  issueScore?: number;
  issueColor?: 'green' | 'yellow' | 'red';
};

export type CRCustomer = {
  id: string;
  customerName: string;
  openCRs: number;
  closedCRs: number;
  totalCRs?: number;
  repeatCRs: number;
  repeatCRPct?: number;
  crScore?: number;
  crColor?: 'green' | 'yellow' | 'red';
};

export type PaymentCustomer = {
  id: string;
  customerName: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceType: string;
  invoiceAmount: string;
  invoiceAmountINR: string;
  dueDate: string;
  daysOverdue?: number;
  paymentStatus: 'Received' | 'Pending' | 'Overdue';
  paymentColor?: 'green' | 'yellow' | 'red';
  overallScore: number;
};

export type DashboardCustomer = {
  id: string;
  customerName: string;
  vertical: string;
  liveSince: string;
  csOwner: string;
  adoptionStatus: number;
  issuesStatus: number;
  usageStatus: number;
  crStatus: number;
  paymentStatus: number;
  finalScore?: number;
  csAction?: string;
  actionColor?: 'green' | 'yellow' | 'red';
};

export type Ticket = {
  id: string;
  ticketNo: string;
  reportDate: string;
  ticketType: string;
  module: string;
  ticketPriority: string;
  callDesc: string;
  clientName: string;
  ticketStatus: string;
  entryBy: string;
  currOwner: string;
  targetDate: string;
  clientTargetDate: string;
  entryDate: string;
};

export type User = {
  username: string;
  password: string;
};
