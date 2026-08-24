import type { Customer, CustomerGroup } from "@/types/admin";

interface CustomerSeed {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
  status: Customer["status"];
  ordersCount: number;
  totalSpent: number;
  lastOrderAt?: string;
  joinedAt: string;
}

const seeds: CustomerSeed[] = [
  { id: "cust-001", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98200 11234", group: "VIP", status: "active", ordersCount: 9, totalSpent: 42990, lastOrderAt: "2026-08-24", joinedAt: "2025-11-02" },
  { id: "cust-002", name: "Ananya Rao", email: "ananya.rao@example.com", phone: "+91 98330 22345", group: "Regular", status: "active", ordersCount: 4, totalSpent: 15960, lastOrderAt: "2026-08-20", joinedAt: "2026-01-15" },
  { id: "cust-003", name: "Kavya Nair", email: "kavya.nair@example.com", phone: "+91 90040 33456", group: "Regular", status: "active", ordersCount: 2, totalSpent: 7498, lastOrderAt: "2026-08-18", joinedAt: "2026-03-08" },
  { id: "cust-004", name: "Riya Mehta", email: "riya.mehta@example.com", phone: "+91 99870 44567", group: "VIP", status: "active", ordersCount: 12, totalSpent: 68420, lastOrderAt: "2026-08-23", joinedAt: "2025-08-19" },
  { id: "cust-005", name: "Sneha Iyer", email: "sneha.iyer@example.com", phone: "+91 96540 55678", group: "Regular", status: "inactive", ordersCount: 1, totalSpent: 2799, lastOrderAt: "2026-05-02", joinedAt: "2026-04-20" },
  { id: "cust-006", name: "Divya Patel", email: "divya.patel@example.com", phone: "+91 98450 66789", group: "Regular", status: "active", ordersCount: 3, totalSpent: 10497, lastOrderAt: "2026-08-11", joinedAt: "2026-02-27" },
  { id: "cust-007", name: "Neha Kulkarni", email: "neha.kulkarni@example.com", phone: "+91 97650 77890", group: "New", status: "active", ordersCount: 1, totalSpent: 3799, lastOrderAt: "2026-08-22", joinedAt: "2026-08-15" },
  { id: "cust-008", name: "Ishita Verma", email: "ishita.verma@example.com", phone: "+91 90910 88901", group: "Regular", status: "active", ordersCount: 5, totalSpent: 18995, lastOrderAt: "2026-08-19", joinedAt: "2025-12-30" },
  { id: "cust-009", name: "Meera Joshi", email: "meera.joshi@example.com", phone: "+91 98980 99012", group: "VIP", status: "active", ordersCount: 15, totalSpent: 89340, lastOrderAt: "2026-08-24", joinedAt: "2025-06-11" },
  { id: "cust-010", name: "Aarushi Singh", email: "aarushi.singh@example.com", phone: "+91 99220 10123", group: "New", status: "active", ordersCount: 1, totalSpent: 2499, lastOrderAt: "2026-08-14", joinedAt: "2026-08-01" },
  { id: "cust-011", name: "Pooja Reddy", email: "pooja.reddy@example.com", phone: "+91 91234 21234", group: "Regular", status: "blocked", ordersCount: 2, totalSpent: 6598, lastOrderAt: "2026-06-30", joinedAt: "2026-01-05" },
  { id: "cust-012", name: "Simran Kaur", email: "simran.kaur@example.com", phone: "+91 98765 32345", group: "Regular", status: "active", ordersCount: 6, totalSpent: 21540, lastOrderAt: "2026-08-21", joinedAt: "2025-10-14" },
  { id: "cust-013", name: "Tanvi Desai", email: "tanvi.desai@example.com", phone: "+91 90080 43456", group: "New", status: "active", ordersCount: 1, totalSpent: 1899, lastOrderAt: "2026-08-16", joinedAt: "2026-08-09" },
  { id: "cust-014", name: "Aditi Bansal", email: "aditi.bansal@example.com", phone: "+91 97025 54567", group: "Regular", status: "active", ordersCount: 4, totalSpent: 13996, lastOrderAt: "2026-08-13", joinedAt: "2026-02-02" },
  { id: "cust-015", name: "Nandini Pillai", email: "nandini.pillai@example.com", phone: "+91 96660 65678", group: "VIP", status: "active", ordersCount: 10, totalSpent: 55420, lastOrderAt: "2026-08-22", joinedAt: "2025-09-27" },
  { id: "cust-016", name: "Kritika Malhotra", email: "kritika.malhotra@example.com", phone: "+91 98110 76789", group: "Regular", status: "active", ordersCount: 3, totalSpent: 9297, lastOrderAt: "2026-08-09", joinedAt: "2026-03-19" },
];

export const mockCustomers: Customer[] = seeds.map((seed, index) => ({
  id: seed.id,
  name: seed.name,
  email: seed.email,
  phone: seed.phone,
  group: seed.group,
  status: seed.status,
  ordersCount: seed.ordersCount,
  totalSpent: seed.totalSpent,
  averageOrderValue: Math.round(seed.totalSpent / seed.ordersCount),
  lastOrderAt: seed.lastOrderAt,
  joinedAt: seed.joinedAt,
  wishlistCount: (index % 5) + 1,
  addresses: [
    {
      id: `${seed.id}-addr-1`,
      label: "Home",
      fullName: seed.name,
      line1: `${100 + index}, Silver Oak Residency`,
      line2: "MG Road",
      city: ["Mumbai", "Pune", "Bengaluru", "Delhi", "Hyderabad", "Ahmedabad"][index % 6],
      state: ["Maharashtra", "Maharashtra", "Karnataka", "Delhi", "Telangana", "Gujarat"][index % 6],
      postalCode: `4${(10000 + index * 7).toString().slice(0, 5)}`,
      country: "India",
      phone: seed.phone,
      isDefault: true,
    },
  ],
}));

export const mockCustomerGroups: CustomerGroup[] = [
  { id: "grp-vip", name: "VIP", description: "Top-spending customers with 10+ orders.", customerCount: mockCustomers.filter((c) => c.group === "VIP").length, discountPercent: 10 },
  { id: "grp-regular", name: "Regular", description: "Returning customers with 2+ orders.", customerCount: mockCustomers.filter((c) => c.group === "Regular").length },
  { id: "grp-new", name: "New", description: "First-time customers, joined within 30 days.", customerCount: mockCustomers.filter((c) => c.group === "New").length },
];
