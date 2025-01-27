"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

interface Step {
  type: string;
  description: string;
}

interface Tool {
  id: string;
  name: string;
}

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tools: Tool[] = [
  { id: "data-analysis", name: "Data Analysis" },
  { id: "document-processing", name: "Document Processing" },
  { id: "email-integration", name: "Email Integration" },
  { id: "api-access", name: "API Access" },
  { id: "reporting", name: "Reporting" },
];

export function AddAgentModal({ isOpen, onClose }: AddAgentModalProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepType, setStepType] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [selectedToolId, setSelectedToolId] = useState("");

  if (!isOpen) return null;

  const handleAddStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stepType && stepDescription) {
      setSteps((prevSteps) => [
        ...prevSteps,
        { type: stepType, description: stepDescription },
      ]);
      setStepType("");
      setStepDescription("");
    }
  };

  const handleRemoveStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const handleAddTool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toolToAdd = tools.find((tool) => tool.id === selectedToolId);
    if (toolToAdd && !selectedTools.some((tool) => tool.id === toolToAdd.id)) {
      setSelectedTools((prevTools) => [...prevTools, toolToAdd]);
      setSelectedToolId("");
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools((prevTools) =>
      prevTools.filter((tool) => tool.id !== toolId)
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-4/5 h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Agent</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <Tabs defaultValue="tool-configuration" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tool-configuration">
                Tool Configuration
              </TabsTrigger>
              <TabsTrigger value="background-workflow">
                Background Workflow
              </TabsTrigger>
              <TabsTrigger value="notifications-settings">
                Notifications Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tool-configuration">
              <form className="space-y-4 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <label
                    htmlFor="agentName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Agent Name
                  </label>
                  <Input
                    id="agentName"
                    placeholder="Enter agent name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="taskDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Agent Task Description
                  </label>
                  <textarea
                    id="taskDescription"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe the agent's tasks"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Tools Access
                  </p>
                  <div className="space-y-4">
                    {selectedTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-center justify-between bg-gray-100 p-2 px-4 rounded"
                      >
                        <span className="text-sm">{tool.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
                          onClick={() => handleRemoveTool(tool.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <select
                        className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedToolId}
                        onChange={(e) => setSelectedToolId(e.target.value)}
                      >
                        <option value="">Select a tool</option>
                        {tools
                          .filter(
                            (tool) =>
                              !selectedTools.some(
                                (selectedTool) => selectedTool.id === tool.id
                              )
                          )
                          .map((tool) => (
                            <option key={tool.id} value={tool.id}>
                              {tool.name}
                            </option>
                          ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) =>
                          handleAddTool(
                            e as unknown as React.FormEvent<HTMLFormElement>
                          )
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tool
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="background-workflow">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="taskRunFrequency"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Task Run Frequency
                  </label>
                  <select
                    id="taskRunFrequency"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="expectedOutputFormat"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Expected Output Format
                  </label>
                  <select
                    id="expectedOutputFormat"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select output format</option>
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="xml">XML</option>
                    <option value="plaintext">Plain Text</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Workflow Steps
                  </p>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between space-x-2 bg-gray-100 p-2 px-4 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {step.type}
                          </span>
                          <span className="text-xs italic">
                            ({step.description})
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
                          onClick={() => handleRemoveStep(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <select
                        className="w-40 px-2 py-3 h-10 text-xs text-gray-700 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={stepType}
                        onChange={(e) => setStepType(e.target.value)}
                      >
                        <option value="">Select type</option>
                        <option value="Data Collection">Data Collection</option>
                        <option value="Analysis">Analysis</option>
                        <option value="Reporting">Reporting</option>
                        <option value="Notification">Notification</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Step description"
                        className="flex-grow px-3 py-3 h-10 text-xs text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={stepDescription}
                        onChange={(e) => setStepDescription(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) =>
                          handleAddStep(
                            e as unknown as React.FormEvent<HTMLFormElement>
                          )
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Step
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="notifications-settings" className="pt-4">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="notificationConditions"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Notification Conditions
                  </label>
                  <textarea
                    id="notificationConditions"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Specify conditions that trigger notifications..."
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="notificationFrequency"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Notification Frequency
                  </label>
                  <select
                    id="notificationFrequency"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Notification Channels
                  </p>
                  <div className="space-y-2">
                    {["Email", "Push Notifications", "Platform"].map(
                      (channel) => (
                        <label
                          key={channel}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {channel}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <div className="border-t p-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button>Add Agent</Button>
        </div>
      </div>
    </div>
  );
}
