import { RevenueSummary } from "../models/revenu-mofule/revenue.model"; 

const testRevenueSummaries: RevenueSummary[] = [
  {
    month: '2026-08',
    totalRevenue: 123100,
    totalCollected: 88450,
    totalPending: 34650,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 13650 },
      { propertyName: 'Green View Apartments', amount: 16950 },
      { propertyName: 'Royal Heights', amount: 20050 },
      { propertyName: 'City Nest', amount: 11350 },
      { propertyName: 'Lake View Homes', amount: 22850 },
      { propertyName: 'Sai Comforts', amount: 10200 },
      { propertyName: 'Elite Residency', amount: 18050 }
    ]
  },
  {
    month: '2026-07',
    totalRevenue: 119500,
    totalCollected: 103500,
    totalPending: 16000,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 13000 },
      { propertyName: 'Green View Apartments', amount: 16500 },
      { propertyName: 'Royal Heights', amount: 19500 },
      { propertyName: 'City Nest', amount: 11000 },
      { propertyName: 'Lake View Homes', amount: 22000 },
      { propertyName: 'Sai Comforts', amount: 9500 },
      { propertyName: 'Elite Residency', amount: 18000 }
    ]
  },
  {
    month: '2026-06',
    totalRevenue: 116800,
    totalCollected: 101300,
    totalPending: 15500,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 12800 },
      { propertyName: 'Green View Apartments', amount: 16200 },
      { propertyName: 'Royal Heights', amount: 19200 },
      { propertyName: 'City Nest', amount: 10800 },
      { propertyName: 'Lake View Homes', amount: 21500 },
      { propertyName: 'Sai Comforts', amount: 9300 },
      { propertyName: 'Elite Residency', amount: 17000 }
    ]
  },
  {
    month: '2026-05',
    totalRevenue: 114200,
    totalCollected: 98200,
    totalPending: 16000,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 12500 },
      { propertyName: 'Green View Apartments', amount: 15800 },
      { propertyName: 'Royal Heights', amount: 18800 },
      { propertyName: 'City Nest', amount: 10600 },
      { propertyName: 'Lake View Homes', amount: 21000 },
      { propertyName: 'Sai Comforts', amount: 9200 },
      { propertyName: 'Elite Residency', amount: 16300 }
    ]
  },
  {
    month: '2026-04',
    totalRevenue: 111500,
    totalCollected: 96500,
    totalPending: 15000,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 12300 },
      { propertyName: 'Green View Apartments', amount: 15400 },
      { propertyName: 'Royal Heights', amount: 18400 },
      { propertyName: 'City Nest', amount: 10400 },
      { propertyName: 'Lake View Homes', amount: 20500 },
      { propertyName: 'Sai Comforts', amount: 9000 },
      { propertyName: 'Elite Residency', amount: 15500 }
    ]
  },
  {
    month: '2026-03',
    totalRevenue: 108900,
    totalCollected: 94200,
    totalPending: 14700,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 12000 },
      { propertyName: 'Green View Apartments', amount: 15000 },
      { propertyName: 'Royal Heights', amount: 18000 },
      { propertyName: 'City Nest', amount: 10200 },
      { propertyName: 'Lake View Homes', amount: 20000 },
      { propertyName: 'Sai Comforts', amount: 8800 },
      { propertyName: 'Elite Residency', amount: 14900 }
    ]
  },
  {
    month: '2026-02',
    totalRevenue: 105600,
    totalCollected: 92000,
    totalPending: 13600,
    propertyBreakdown: [
      { propertyName: 'Sunrise Residency', amount: 11800 },
      { propertyName: 'Green View Apartments', amount: 14700 },
      { propertyName: 'Royal Heights', amount: 17500 },
      { propertyName: 'City Nest', amount: 9800 },
      { propertyName: 'Lake View Homes', amount: 19500 },
      { propertyName: 'Sai Comforts', amount: 8500 },
      { propertyName: 'Elite Residency', amount: 13800 }
    ]
  }
];

export function getAllRevenue(): RevenueSummary[] | undefined {
  return testRevenueSummaries;
}
