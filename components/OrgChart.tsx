import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface EmployeeData {
  id: string;
  name: string;
  status: string;
  department: string;
  designation: string | null;
  data: Array<{ param: string; value: string }>;
  subordinates: EmployeeData[];
  actionableIds: string[];
  avatarUrl: string | null;
}

interface EmployeeCardProps {
  employee: EmployeeData;
  onToggle: (id: string) => void;
  isExpanded: boolean;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "on track":
      return "text-green-600 bg-green-500/10 border border-green-500/30 rounded-md px-2 py-1";
    case "at risk":
      return "text-yellow-600 bg-yellow-500/10 border border-yellow-500/30 rounded-md px-2 py-1 ";
    case "off track":
      return "text-red-600 bg-red-500/10 border border-red-500/30 rounded-md px-2 py-1";
    default:
      return "text-gray-600 bg-gray-500/10 border border-gray-500/30 rounded-md px-2 py-1";
  }
};

const EmployeeCard = ({
  employee,
  onToggle,
  isExpanded,
}: EmployeeCardProps) => {
  const initials = employee.name
    .split("@")[0] // Handle email addresses
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Card className="w-[280px] bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gray-50 border flex items-center justify-center">
                <span className="text-lg font-medium text-gray-900">
                  {initials}
                </span>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-700 bg-gray-100 rounded-md px-2 py-1">{employee.department}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className={cn("text-sm", getStatusColor(employee.status))}>
                  {employee.status}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {employee.subordinates && employee.subordinates.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggle(employee.id)}
                  className={cn(
                    "transition-transform",
                    isExpanded && "rotate-180"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const dummyData: EmployeeData = {
  id: "1",
  name: "John Smith",
  status: "On Track",
  department: "Compliance",
  designation: "CTO",
  data: [
    { param: "Email", value: "john@example.com" },
    { param: "Phone", value: "123-456-7890" }
  ],
  actionableIds: [],
  avatarUrl: null,
  subordinates: [
    {
      id: "2",
      name: "Sarah Johnson",
      status: "At Risk",
      department: "KYC",
      designation: "Lead Engineer",
      data: [],
      actionableIds: [],
      avatarUrl: null,
      subordinates: [
        {
          id: "4",
          name: "Mike Wilson",
          status: "On Track",
          department: "Customer Onboarding",
          designation: "Developer",
          data: [],
          actionableIds: [],
          avatarUrl: null,
          subordinates: []
        },
        {
          id: "5",
          name: "Emma Davis",
          status: "Off Track",
          department: "Regulatory Monitoring",
          designation: "Developer",
          data: [],
          actionableIds: [],
          avatarUrl: null,
          subordinates: []
        }
      ]
    },
    {
      id: "3",
      name: "Robert Chen",
      status: "On Track",
      department: "Surveillance",
      designation: "Lead Engineer",
      data: [],
      actionableIds: [],
      avatarUrl: null,
      subordinates: [
        {
          id: "6",
          name: "Lisa Park",
          status: "At Risk",
          department: "Surveillance",
          designation: "Senior Developer",
          data: [],
          actionableIds: [],
          avatarUrl: null,
          subordinates: []
        }
      ]
    }
  ]
};

const OrgChart = ({ data = dummyData }: { data?: EmployeeData }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <EmployeeCard
        employee={data}
        onToggle={handleToggle}
        isExpanded={expandedIds.has(data.id)}
      />

      {expandedIds.has(data.id) &&
        data.subordinates &&
        data.subordinates.length > 0 && (
          <>
            <div className="w-px h-8 bg-gray-200" />
            <div className="relative flex gap-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gray-200 w-full" />

              {data.subordinates.map((subordinate) => (
                <div
                  key={subordinate.id}
                  className="flex flex-col items-center"
                >
                  <div className="w-px h-8 bg-gray-200" />
                  <OrgChart data={subordinate} />
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default OrgChart;
