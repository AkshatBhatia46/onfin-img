"use client";

import Logo from "@/app/assets/icon.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Bot,
  Calendar,
  Cpu,
  Paperclip,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { AddAgentModal } from "./add-agent-modal";
import { ComplianceGraphModal } from "./compliance-graph-modal";

const agents: AgentData[] = [
  {
    name: "KYC Verification Agent",
    tools: 5,
    tasks: 2,
    notificationCount: 3,
    description1: "Validates customer identities, ensuring compliance with KYC requirements",
    description2: "Assists with compliance tasks",
    workflow: {
      frequency: "hourly",
      outputFormat: "json",
      steps: [
        { type: "Data Collection", description: "Gather customer KYC documents and information" },
        { type: "Analysis", description: "Validate documents against regulatory requirements" },
        { type: "Reporting", description: "Generate compliance verification reports" },
        { type: "Notification", description: "Alert compliance officers of verification status" }
      ]
    },
    notifications: {
      conditions: "Alert on failed verifications, suspicious patterns, or incomplete documentation",
      frequency: "realtime",
      channels: ["Email", "Platform"]
    },
    selectedTools: [
      { id: "document-processing", name: "Document Processing" },
      { id: "data-analysis", name: "Data Analysis" },
      { id: "api-access", name: "API Access" },
      { id: "reporting", name: "Reporting" },
      { id: "email-integration", name: "Email Integration" }
    ]
  },
  {
    name: "Regulatory Filing Agent",
    tools: 3,
    tasks: 1,
    notificationCount: 0,
    description1: "Automates official document submissions, guaranteeing accuracy and compliance",
    description2: "Generates insights and reports",
    workflow: {
      frequency: "daily",
      outputFormat: "xml",
      steps: [
        { type: "Data Collection", description: "Gather required filing data from systems" },
        { type: "Analysis", description: "Validate data completeness and accuracy" },
        { type: "Reporting", description: "Prepare regulatory filing documents" }
      ]
    },
    notifications: {
      conditions: "Alert on filing deadlines, submission errors, or regulatory updates",
      frequency: "daily",
      channels: ["Email", "Push Notifications"]
    },
    selectedTools: [
      { id: "document-processing", name: "Document Processing" },
      { id: "api-access", name: "API Access" },
      { id: "reporting", name: "Reporting" }
    ]
  },
  {
    name: "KYC Actionable Tracking Agent",
    tools: 4,
    tasks: 0,
    notificationCount: 1,
    description1: "Tracks KYC tasks, ensuring resolution and regulatory adherence",
    description2: "Recommends mitigation strategies",
    workflow: {
      frequency: "daily",
      outputFormat: "json",
      steps: [
        { type: "Data Collection", description: "Monitor KYC task statuses and deadlines" },
        { type: "Analysis", description: "Identify bottlenecks and compliance risks" },
        { type: "Reporting", description: "Generate task progress reports" },
        { type: "Notification", description: "Send reminders for pending tasks" }
      ]
    },
    notifications: {
      conditions: "Alert on overdue tasks, compliance risks, or process bottlenecks",
      frequency: "daily",
      channels: ["Email", "Platform", "Push Notifications"]
    },
    selectedTools: [
      { id: "data-analysis", name: "Data Analysis" },
      { id: "reporting", name: "Reporting" },
      { id: "email-integration", name: "Email Integration" },
      { id: "api-access", name: "API Access" }
    ]
  }
];

interface AgentData {
  name: string;
  tools: number;
  tasks: number;
  notificationCount: number;
  description1: string;
  description2: string;
  workflow: {
    frequency: string;
    outputFormat: string;
    steps: Array<{ type: string; description: string; }>;
  };
  notifications: {
    conditions: string;
    frequency: string;
    channels: string[];
  };
  selectedTools: Array<{ id: string; name: string; }>;
}

export default function RegulationsInterface() {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);

  return (
    <div className="h-screen w-full grid grid-cols-[300px_1fr_300px] grid-rows-[1fr_auto]">
      {/* Left Panel - Checklist */}
      <div className="border border-border p-2 flex flex-col h-full">
        <div className="flex-grow mb-2 overflow-auto space-y-2 border border-gray-200 p-2 pb-1">
          <h2 className="font-medium mb-4 flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Checklist
          </h2>
          {[
            {
              title: "Review 10 pending failed KYC verifications",
              status: "In Progress",
              dueDate: "2025-02-15",
              urgency: "High",
            },
            {
              title:
                "Review new actionables on 'Customer Identification Programs' rules by SEBI",
              status: "Not Started",
              dueDate: "2025-03-01",
              urgency: "Medium",
            },
            {
              title: "Update data privacy policy to align with new laws",
              status: "Completed",
              dueDate: "2025-01-30",
              urgency: "Low",
            },
          ].map((task, index) => (
            <div key={index} className="p-2 border-b last:border-b-0">
              <div className="flex items-center mb-1">
                <Checkbox
                  className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0"
                  checked={checkedTasks[index]}
                  onCheckedChange={(checked) => {
                    const newCheckedTasks = [...checkedTasks];
                    newCheckedTasks[index] = checked as boolean;
                    setCheckedTasks(newCheckedTasks);
                  }}
                />
                <span
                  className={`font-medium text-sm ${
                    checkedTasks[index] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="ml-6 space-y-1 text-sm text-gray-500">
                <div>
                  Due Date: <span>{task.dueDate}</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-1 ${
                        task.urgency === "High"
                          ? "bg-red-500"
                          : task.urgency === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <span>{task.urgency} Priority</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full justify-start h-12"
          onClick={() => setIsGraphModalOpen(true)}
        >
          <Image src={Logo} alt="Logo" height={25} className="rounded-full" />
          Compliance OS
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="border-y border-r border-border p-4 flex items-end">
        <div className="flex w-full relative items-center space-x-2">
          <Badge
            variant="secondary"
            className="absolute left-4 top-0 transform -translate-y-1/2"
          >
            <Bot className="w-3 h-3 mr-1" />
            ComplianceGPT
          </Badge>
          <Input
            placeholder="Type your message here..."
            className="flex-1 pr-24 py-6 pl-2"
          />
          <button className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <Paperclip className="h-4 w-4" />
          </button>
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="border-y border-r border-border p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium flex items-center">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Agents
          </h2>
        </div>
        <div className="space-y-1">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="flex flex-col p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedAgent(agent);
                setIsAgentModalOpen(true);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{agent.name}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    <p className="line-clamp-2">{`${agent.description1}. ${agent.description2}`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 text-sm space-y-1">
                <span className="flex items-center text-blue-500">
                  <Cpu className="h-4 w-4 mr-2" />
                  {agent.tasks} Active Tasks
                </span>
                <span className="flex items-center text-green-500">
                  <Wrench className="h-4 w-4 mr-2" />
                  {agent.tools} Tools Available
                </span>
                <span className="flex items-center text-yellow-500">
                  <Bell className="h-4 w-4 mr-2" />
                  {agent.notificationCount} Notifications
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddAgentModal
        isOpen={isAgentModalOpen}
        onClose={() => {
          setIsAgentModalOpen(false);
          setSelectedAgent(null);
        }}
        prefillData={selectedAgent || undefined}
      />
      <ComplianceGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
      />
    </div>
  );
}
