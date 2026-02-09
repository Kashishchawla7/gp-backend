import {
  Client,
  AdoptionCustomer,
  UsageCustomer,
  IssueCustomer,
  CRCustomer,
  PaymentCustomer,
  DashboardCustomer,
  Ticket,
  User,
} from './types';

// In-memory data storage (in production, use a database)
export const dataStore = {
  clients: [] as Client[],
  adoptionCustomers: [] as AdoptionCustomer[],
  usageCustomers: [] as UsageCustomer[],
  issueCustomers: [] as IssueCustomer[],
  crCustomers: [] as CRCustomer[],
  paymentCustomers: [] as PaymentCustomer[],
  dashboardCustomers: [] as DashboardCustomer[],
  tickets: [] as Ticket[],
  users: [
    { username: 'admin', password: 'admin123' },
    { username: 'manager', password: 'manager123' },
    { username: 'user', password: 'user123' },
  ] as User[],
};

// Helper function to calculate dashboard scores
function calculateDashboardScore(customer: DashboardCustomer): DashboardCustomer {
  const adoption = customer.adoptionStatus || 0;
  const issues = customer.issuesStatus || 0;
  const usage = customer.usageStatus || 0;
  const cr = customer.crStatus || 0;
  const payment = customer.paymentStatus || 0;

  // Final Score = (Adoption × 0.25) + (Issues × 0.20) + (Usage × 0.20) + (CR × 0.15) + (Payment × 0.20)
  const finalScore = Math.round(
    (adoption * 0.25) +
    (issues * 0.20) +
    (usage * 0.20) +
    (cr * 0.15) +
    (payment * 0.20)
  );

  let csAction: string;
  let actionColor: 'green' | 'yellow' | 'red';

  if (finalScore >= 90) {
    csAction = 'Monthly Meet';
    actionColor = 'green';
  } else if (finalScore >= 70) {
    csAction = 'Weekly Meet';
    actionColor = 'yellow';
  } else {
    csAction = 'Daily Follow-up';
    actionColor = 'red';
  }

  return {
    ...customer,
    finalScore,
    csAction,
    actionColor,
  };
}

// Initialize with default data
export function initializeDefaultData() {
  if (dataStore.dashboardCustomers.length === 0) {
    const rawData: DashboardCustomer[] = [
      {
        id: '1',
        customerName: 'DP Global',
        vertical: 'BK Mfg',
        liveSince: 'Dec-22',
        csOwner: 'Sarthak',
        adoptionStatus: 100,
        issuesStatus: 100,
        usageStatus: 86,
        crStatus: 76,
        paymentStatus: 100,
      },
      {
        id: '2',
        customerName: 'Shell Apparels',
        vertical: 'BK Mfg',
        liveSince: 'Aug-23',
        csOwner: 'Sarthak',
        adoptionStatus: 80,
        issuesStatus: 86,
        usageStatus: 99,
        crStatus: 100,
        paymentStatus: 100,
      },
      {
        id: '3',
        customerName: 'Wonderblues',
        vertical: 'BK Mfg',
        liveSince: 'Sep-24',
        csOwner: 'Sarthak',
        adoptionStatus: 80,
        issuesStatus: 53,
        usageStatus: 77,
        crStatus: 27,
        paymentStatus: 100,
      },
      {
        id: '4',
        customerName: 'Fortunex',
        vertical: 'BK Mfg',
        liveSince: 'Dec-25',
        csOwner: 'Sarthak',
        adoptionStatus: 100,
        issuesStatus: 88,
        usageStatus: 97,
        crStatus: 43,
        paymentStatus: 100,
      },
      {
        id: '5',
        customerName: 'Sahu Global Private Limited (US)',
        vertical: 'BK Mfg',
        liveSince: 'Jan-22',
        csOwner: 'Vaibhav',
        adoptionStatus: 100,
        issuesStatus: 53,
        usageStatus: 100,
        crStatus: 86,
        paymentStatus: 100,
      },
      {
        id: '6',
        customerName: 'Sahu Global Private Limited (EU)',
        vertical: 'BK Mfg',
        liveSince: 'Feb-22',
        csOwner: 'Vaibhav',
        adoptionStatus: 100,
        issuesStatus: 61,
        usageStatus: 100,
        crStatus: 81,
        paymentStatus: 100,
      },
    ];

    // Calculate scores for all customers
    dataStore.dashboardCustomers = rawData.map(calculateDashboardScore);
  }
}
