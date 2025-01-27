"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  CalendarIcon,
  CheckSquare,
  FileArchive,
  FileSpreadsheet,
  FileText,
  GitBranch,
  PenToolIcon as Tool,
  Users,
} from "lucide-react";
import { useState } from "react";
import OrgChart from "../OrgChart";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

// interface Company {
//   id: string;
//   name: string;
//   shortName: string;
//   industry: string;
//   logo: string;
// }

interface LibraryItem {
  content: string;
  source: string;
  pageNo: number;
  lastUpdated: string;
}

interface Tool {
  name: string;
  credentials: string;
  useCases: string[];
  userPersona: string;
}

// const companies: Company[] = [
//   {
//     id: "mm",
//     name: "Mahindra & Mahindra",
//     shortName: "M&M",
//     industry: "Automotive",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
//   {
//     id: "vedl",
//     name: "Vedanta Limited",
//     shortName: "VEDL",
//     industry: "Mining and Metals",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
//   {
//     id: "maruti",
//     name: "Maruti Suzuki",
//     shortName: "MARUTI",
//     industry: "Automotive",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
//   {
//     id: "tatamotors",
//     name: "Tata Motors",
//     shortName: "TATAMOTORS",
//     industry: "Automotive",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
//   {
//     id: "axisbank",
//     name: "Axis Bank",
//     shortName: "AXISBANK",
//     industry: "Banking and Financial Services",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
//   {
//     id: "hdfcbank",
//     name: "HDFC Bank",
//     shortName: "HDFCBANK",
//     industry: "Banking and Financial Services",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%205.22.18%E2%80%AFPM-jnNNtZNEjMs1Nt6UoXOJOciyDc1mfC.png",
//   },
// ];

interface ComplianceGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Artifact {
  name: string;
  type: string;
  lastUpdated: string;
}

export function ComplianceGraphModal({
  isOpen,
  onClose,
}: ComplianceGraphModalProps) {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("library");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tools, setTools] = useState<Tool[]>([]);
  const [newTool, setNewTool] = useState<Tool>({
    name: "",
    credentials: "",
    useCases: [],
    userPersona: "",
  });
  const [newUseCase, setNewUseCase] = useState("");

  const libraryItems: LibraryItem[] = [
    {
      content:
        "Section 1.2: Environmental Compliance\nCompanies must adhere to strict environmental guidelines, including waste management, emissions control, and sustainable practices. Regular audits and reporting are mandatory.",
      source: "Environmental Protection Act",
      pageNo: 15,
      lastUpdated: "2025-01-15",
    },
    {
      content:
        "Chapter 3: Data Privacy and Protection\nOrganizations handling personal data must implement robust security measures, obtain explicit consent for data collection, and provide transparency in data usage. Violations may result in severe penalties.",
      source: "Data Protection Regulation",
      pageNo: 42,
      lastUpdated: "2025-02-03",
    },
    {
      content:
        "Section 5.1: Anti-Money Laundering (AML) Policies\nFinancial institutions are required to establish and maintain effective AML programs, including customer due diligence, transaction monitoring, and suspicious activity reporting.",
      source: "Financial Compliance Handbook",
      pageNo: 78,
      lastUpdated: "2025-01-28",
    },
  ];

  const artifacts: Artifact[] = [
    {
      name: "Best Practices for CICs",
      type: "Context",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Best Practices for CIs",
      type: "Context",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Microfinance Data Quality Index",
      type: "Checklist",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Consumer Data Quality Index",
      type: "Checklist",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Uniform Credit Reporting Format",
      type: "Form",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Guidelines for reporting of credit",
      type: "Context",
      lastUpdated: "Jan 15, 2025",
    },
    {
      name: "Eligibilty criteria for entities",
      type: "Context",
      lastUpdated: "Jan 15, 2025",
    },
  ];

  const reportingDisclosures = [
    {
      actionableId: "6784f02e5a8f406c8ccc3420",
      circularId: "BSA/AML/2024/01",
      completionPercentage: 85,
      documents: [],
      dueDate: "2025-02-15",
      id: "6785f106330e82f7ab5ba0e6",
      isDisclosure: true,
      logs: [
        {
          comment: "Customer notice template under final review",
          completedDate: null,
          date: "2025-01-14",
          dueDate: "2025-02-15",
          status: "review",
        }
      ],
      periodicity: "one-time",
      priority: "High",
      regulator: "FinCEN",
      reportingTo: ["Compliance Officer", "Legal Department"],
      tags: ["KYC", "Customer Disclosure"],
      title: "Customer Identity Verification Notice Implementation",
      type: "Disclosure"
    },
    {
      actionableId: "6784f02e5a8f406c8ccc3421",
      circularId: "BSA/AML/2024/02",
      completionPercentage: 60,
      documents: [],
      dueDate: "2025-03-31",
      id: "6785f106330e82f7ab5ba0e7",
      isDisclosure: true,
      logs: [
        {
          comment: "Contract draft in legal review",
          completedDate: null,
          date: "2025-01-15",
          dueDate: "2025-03-31",
          status: "in-progress",
        }
      ],
      periodicity: "annual",
      priority: "High",
      regulator: "FinCEN",
      reportingTo: ["Board of Directors", "Compliance Officer"],
      tags: ["Third Party Reliance", "CIP"],
      title: "CIP Reliance Agreement and Certification",
      type: "Documentation"
    }
  ];

  // const filteredCompanies = companies.filter(
  //   (company) =>
  //     company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     company.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const toggleCompany = (companyId: string) => {
  //   setSelectedCompanies((prev) =>
  //     prev.includes(companyId)
  //       ? prev.filter((id) => id !== companyId)
  //       : [...prev, companyId]
  //   );
  // };

  // const toggleAll = () => {
  //   if (selectedCompanies.length === companies.length) {
  //     setSelectedCompanies([]);
  //   } else {
  //     setSelectedCompanies(companies.map((company) => company.id));
  //   }
  // };

  const handleOpenPDF = (source: string, pageNo: number) => {
    console.log(`Opening PDF: ${source}, Page: ${pageNo}`);
  };

  const handleToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTools([...tools, newTool]);
    setNewTool({ name: "", credentials: "", useCases: [], userPersona: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTool({ ...newTool, [e.target.name]: e.target.value });
  };

  const handleUseCaseAdd = () => {
    if (newUseCase) {
      setNewTool({ ...newTool, useCases: [...newTool.useCases, newUseCase] });
      setNewUseCase("");
    }
  };

  const complianceStages = {
    "Actionable Assigned": [
      {
        id: "sys-1",
        title: "Account Opening System Modification",
        description:
          "Implement required field validation in account opening system",
        assignee: "Mike Wilson",
        department: "Customer Onboarding",
        priority: "High",
        dueDate: "2025-02-28",
      },
      {
        id: "doc-1",
        title: "Documentary Verification Checklist",
        description: "Create verification checklist for US and non-US persons",
        assignee: "Sarah Johnson",
        department: "KYC",
        priority: "High",
        dueDate: "2025-02-15",
      },
      {
        id: "mon-1",
        title: "Suspicious Activity Monitoring Setup",
        description: "Define SAR filing triggers and procedures",
        assignee: "Robert Chen",
        department: "Surveillance",
        priority: "Medium",
        dueDate: "2025-03-01",
      },
    ],
    "Manner of Compliance Confirmed": [
      {
        id: "ver-1",
        title: "Non-Documentary Verification Process",
        description:
          "Establish procedures for cases requiring additional verification",
        assignee: "Emma Davis",
        department: "Regulatory Monitoring",
        priority: "High",
        dueDate: "2025-02-20",
      },
      {
        id: "edd-1",
        title: "Enhanced Due Diligence Framework",
        description: "Define risk-based EDD triggers and procedures",
        assignee: "Lisa Park",
        department: "Surveillance",
        priority: "High",
        dueDate: "2025-02-25",
      },
    ],
    "Policy & Control Mapping Done": [
      {
        id: "rec-1",
        title: "Record Retention Policy",
        description:
          "Establish retention schedules for different document types",
        assignee: "Mike Wilson",
        department: "Customer Onboarding",
        priority: "Medium",
        dueDate: "2025-03-15",
      },
      {
        id: "erisa-1",
        title: "ERISA Account Procedures",
        description: "Document ERISA plan account identification process",
        assignee: "Sarah Johnson",
        department: "KYC",
        priority: "Low",
        dueDate: "2025-03-30",
      },
    ],
    "Disclosure & Reporting Completed": [
      {
        id: "impl-1",
        title: "Implementation Timeline",
        description: "Document compliance timeline and transition procedures",
        assignee: "Emma Davis",
        department: "Regulatory Monitoring",
        priority: "High",
        dueDate: "2025-02-10",
      },
      {
        id: "for-1",
        title: "Foreign Business Documentation",
        description: "Establish alternative documentation procedures",
        assignee: "Robert Chen",
        department: "Surveillance",
        priority: "Medium",
        dueDate: "2025-03-10",
      },
    ],
    "Metric Tracking & Evidence Collection": [
      {
        id: "rel-1",
        title: "Reliance Agreement Framework",
        description: "Create templates for third-party reliance agreements",
        assignee: "Lisa Park",
        department: "Surveillance",
        priority: "Medium",
        dueDate: "2025-03-20",
      },
      {
        id: "mon-2",
        title: "Monitoring Metrics Setup",
        description: "Define KPIs for CIP compliance monitoring",
        assignee: "Emma Davis",
        department: "Regulatory Monitoring",
        priority: "High",
        dueDate: "2025-02-28",
      },
    ],
    "Evidence Review": [
      {
        id: "aud-1",
        title: "Documentation Review Process",
        description: "Establish procedures for periodic documentation review",
        assignee: "Sarah Johnson",
        department: "KYC",
        priority: "Medium",
        dueDate: "2025-03-25",
      },
      {
        id: "rep-1",
        title: "Compliance Report Template",
        description: "Create standardized reporting format for evidence review",
        assignee: "Robert Chen",
        department: "Surveillance",
        priority: "Low",
        dueDate: "2025-04-01",
      },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] h-[95vh] max-w-none max-h-none p-0 flex flex-col"
        style={{ maxWidth: "95vw", maxHeight: "95vh" }}
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b p-4">
          <DialogTitle className="text-xl">ComplianceOS</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Left Sidebar */}
          <div className="flex h-full">
            <div className="w-64 flex-shrink-0 border-r p-2 space-y-2 pt-0 overflow-y-auto">
              {[
                { id: "library", icon: BookOpen, label: "Library" },
                {
                  id: "compliance-graph",
                  icon: GitBranch,
                  label: "Compliance Graph",
                },
                {
                  id: "reporting",
                  icon: FileText,
                  label: "Reporting & Disclosures",
                },
                { id: "artifacts", icon: FileArchive, label: "Artifacts" },
                { id: "tools", icon: Tool, label: "Tools" },
                { id: "org-chart", icon: Users, label: "Org Chart" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full text-left p-2 rounded-lg flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "library" && (
                <div className="w-full h-full p-4 overflow-auto space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search library..."
                      className="flex-grow"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {libraryItems.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 shadow-sm"
                      >
                        <p className="text-sm mb-2 line-clamp-4">
                          {item.content}
                        </p>
                        <p className="text-xs font-semibold mb-1">
                          Agency: Environmental Protection Agency
                        </p>
                        <div className="text-xs text-gray-500">
                          <p>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenPDF(item.source, item.pageNo);
                              }}
                              className="text-blue-600 hover:underline"
                            >
                              Src: {item.source}, Page {item.pageNo}
                            </a>
                          </p>
                          <p>Last Updated: {item.lastUpdated}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "compliance-graph" && (
                <div className="w-full h-full p-4 overflow-auto">
                  <Tabs defaultValue="requirements" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="requirements">
                        Compliance Requirements
                      </TabsTrigger>
                      <TabsTrigger value="deliverables">
                        Compliance Status
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="requirements" className="mt-4">
                      <div className="text-center text-muted-foreground">
                        Compliance Requirements content coming soon
                      </div>
                    </TabsContent>
                    <TabsContent value="deliverables" className="mt-4">
                      <div className="overflow-x-auto">
                        <div className="flex space-x-4 min-w-[2400px] p-4 h-full">
                          {Object.entries(complianceStages).map(
                            ([column, tasks], index) => (
                              <Card
                                key={index}
                                className="flex-1 min-w-[400px]"
                              >
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium">
                                    <h3 className="text-base font-semibold">
                                      {column}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {column === "Actionable Assigned" &&
                                        "Assign compliance tasks to team members, set responsibilities and deadlines for each aspect of compliance."}
                                      {column ===
                                        "Manner of Compliance Confirmed" &&
                                        "Verify and document methods for meeting regulatory requirements, creating clear plans for each compliance need."}
                                      {column ===
                                        "Policy & Control Mapping Done" &&
                                        "Review and align internal policies with regulatory controls, identifying and addressing any compliance gaps."}
                                      {column ===
                                        "Disclosure & Reporting Completed" &&
                                        "Prepare and submit required compliance reports to authorities after internal review and approval."}
                                      {column ===
                                        "Metric Tracking & Evidence Collection" &&
                                        "Monitor compliance metrics and gather supporting documentation, maintaining an organized repository for audits."}
                                      {column === "Evidence Review" &&
                                        "Assess collected evidence, cross-check against requirements, and prepare for potential regulatory audits or inspections."}
                                    </p>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                      <span className="flex items-center">
                                        <CheckSquare className="w-3 h-3 mr-1" />
                                        Tasks: {tasks.length}
                                      </span>
                                      <span className="flex items-center">
                                        <Users className="w-3 h-3 mr-1" />
                                        People:{" "}
                                        {
                                          new Set(tasks.map((t) => t.assignee))
                                            .size
                                        }
                                      </span>
                                    </div>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  {tasks.map((task) => (
                                    <Card key={task.id} className="p-2">
                                      <p className="text-sm font-medium">
                                        {task.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {task.assignee} - {task.department}
                                      </p>
                                      <div className="flex justify-between mt-1">
                                        <span
                                          className={`text-xs ${
                                            task.priority === "High"
                                              ? "text-red-500"
                                              : task.priority === "Medium"
                                              ? "text-yellow-500"
                                              : "text-green-500"
                                          }`}
                                        >
                                          {task.priority}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          Due: {task.dueDate}
                                        </span>
                                      </div>
                                    </Card>
                                  ))}
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              {activeTab === "reporting" && (
                <div className="w-full h-full p-4 overflow-auto space-y-4">
                  <div className="flex flex-col">
                    <Input
                      placeholder="Search reporting & disclosures..."
                      className="flex-grow"
                    />
                  </div>
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {reportingDisclosures.map((reporting) => (
                      <Card key={reporting.id} className="py-0">
                        <CardHeader className="flex flex-row items-start py-2 pb-4 gap-2">
                          <FileText className="h-6 w-6 mt-3" />
                          <CardTitle className="font-semibold text-lg">
                            <h3>{reporting.title}</h3>
                            <div className="flex flex-row items-center gap-2">
                              <p className=" w-fit px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md">
                                {reporting.tags.join(", ")}
                              </p>
                              <p className=" w-fit px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md">
                                SEC
                              </p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-start gap-20">
                            <div>
                              <h6 className="font-semibold text-sm">
                                Due Date
                              </h6>
                              <p className="text-sm text-muted-foreground">
                                {reporting.dueDate}
                              </p>
                            </div>
                            <div>
                              <h6 className="font-semibold text-sm">
                                Frequency
                              </h6>
                              <p className="text-sm text-muted-foreground capitalize">
                                {reporting.periodicity}
                              </p>
                            </div>
                            <div>
                              <h6 className="font-semibold text-sm">
                                Priority
                              </h6>
                              <p
                                className={cn(
                                  "text-sm",
                                  reporting.priority === "High"
                                    ? "text-red-500"
                                    : reporting.priority === "Medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                )}
                              >
                                {reporting.priority}
                              </p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 pt-6 mt-6">
                            <Progress
                              value={reporting.completionPercentage}
                              className="w-full"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "artifacts" && (
                <div className="w-full h-full p-4 overflow-auto">
                  <div className="flex flex-col">
                    <Input
                      placeholder="Search artifacts..."
                      className="flex-grow"
                    />
                  </div>
                  <div className="py-6 grid grid-cols-3 gap-4">
                    {artifacts.map((artifact) => (
                      <Card
                        key={artifact.name}
                        className="p-4 flex items-start gap-4"
                      >
                        <div className="flex flex-row items-center gap-2 bg-gray-200 rounded-md p-2">
                          <FileSpreadsheet className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold">
                            {artifact.name}
                          </h3>
                          <div className="flex flex-row items-center gap-6">
                            <p className="text-xs font-semibold bg-neutral-200 rounded-md px-2 py-1">
                              {artifact.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {artifact.lastUpdated}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "tools" && (
                <div className="w-full h-full p-4 overflow-auto">
                  <h2 className="text-2xl font-bold mb-4">Tools</h2>
                  <form onSubmit={handleToolSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tool Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={newTool.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="credentials"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Credentials
                      </label>
                      <Textarea
                        id="credentials"
                        name="credentials"
                        value={newTool.credentials}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="useCase"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Use Cases
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          id="useCase"
                          value={newUseCase}
                          onChange={(e) => setNewUseCase(e.target.value)}
                        />
                        <Button type="button" onClick={handleUseCaseAdd}>
                          Add
                        </Button>
                      </div>
                      <ul className="list-disc list-inside mt-2">
                        {newTool.useCases.map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <label
                        htmlFor="userPersona"
                        className="block text-sm font-medium text-gray-700"
                      >
                        User Persona
                      </label>
                      <Textarea
                        id="userPersona"
                        name="userPersona"
                        value={newTool.userPersona}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <Button type="submit">Add Tool</Button>
                  </form>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Added Tools</h3>
                    {tools.map((tool, index) => (
                      <div key={index} className="border p-4 rounded-lg mb-4">
                        <h4 className="font-semibold">
                          {tool.name}{" "}
                          {tool.userPersona && `(${tool.userPersona})`}
                        </h4>
                        <p>
                          <strong className="text-sm">Credentials:</strong>
                          <br />
                          <span className="text-base">{tool.credentials}</span>
                        </p>
                        <p>
                          <strong className="text-sm">Use Cases:</strong>
                        </p>
                        <ul className="list-disc list-inside">
                          {tool.useCases.map((useCase, i) => (
                            <li key={i} className="text-base">
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "org-chart" && (
                <div className="w-full h-full p-4 overflow-auto border border-gray-200 flex items-center justify-center text-muted-foreground">
                  <OrgChart />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
