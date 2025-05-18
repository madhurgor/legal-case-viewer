"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Gavel, Scale, BookOpen, Users, FileText, BarChart3, FileCode } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// This would typically come from an API or props
const caseData = {
  pdf_file: "case-files/level-2/CHENNAI_C-40295-2021_28-02-2024.pdf",
  response: {
    lowerCourtName: "Commissioner of Customs, Chennai – VII",
    currentCourtName: "Customs, Excise & Service Tax Appellate Tribunal, Chennai",
    partyA: "M/s. Flextronics Technologies Pvt. Ltd.",
    partyB: "Commissioner of Customs, Chennai VII Commissionerate",
    factualBackground:
      "M/s. Flextronics Technologies Pvt. Ltd. imported various goods (Receivers, Microphones, Battery Cover, Back Cover, Camera Lens, Front Cover) between July 2017 and January 2018.  The Commissioner of Customs, Chennai – VII issued Orders in Original Nos. 67/2020-AIR (dated 23.1.2020), 804/2019-AIR (dated 9.12.2019), and 58/2020 (dated 21.1.2020) classifying these goods differently than declared by Flextronics, resulting in demands for short-paid duty, interest, and penalties.  Specific amounts are mentioned in the document (Rs.62,97,899/- short-paid duty for Receivers, Rs.3,01,28,441/- differential duty for Microphones, and Rs.1,00,000/- penalty for Receivers).",
    legalIssues: [
      "Whether the imported goods ('Receivers') were correctly classified under CTH 85177090 or should be reclassified under CTH 85181000?",
      "Whether the imported goods ('Microphones') were correctly classified and eligible for exemption under Customs Notification No. 57/2017 (S. No. 6A) or No. 50/2017 (S. No. 499)?",
      "Whether the imported goods ('Battery Cover, Back Cover, Camera Lens, Front Cover') were correctly classified under CTH 3920 9999 or should be classified under CTH 8517 7090?",
      "Whether the Department's appeal against the impugned order for non-imposition of redemption fine is justified?",
      "Can an appellant challenge a matter in appeal which they had earlier acquiesced?",
    ],
    arguments: [
      "Party A Argument: The imported goods are indispensable parts of mobile phones and should be classified accordingly, citing relevant sections of the Customs Tariff Act and relevant case law. They challenged the classification and the imposition of redemption fine.",
      "Party B Argument: The goods were incorrectly classified and not eligible for exemptions, citing Customs Notifications, Boards Circulars, and specific interpretations of relevant tariff headings. The department argued for the imposition of redemption fines.",
    ],
    decisions: [
      "The Tribunal found that the 'Receivers' case should be remanded for de novo adjudication.",
      "The Tribunal found that the 'Microphones' were not eligible for exemption under the cited notifications due to specific exclusions and the burden of proof being on the assessee.",
      "The Tribunal found that the 'Battery Cover, Back Cover, Camera Lens, and Front Cover' were incorrectly classified and should be classified under CTH 8517 7090.",
      "The Tribunal rejected the Department's appeal for redemption fine due to the lack of a blameworthy act by the assessee.",
      "The Tribunal allowed the appellant to challenge the classification despite prior acquiescence, considering the circumstances and the interest of justice.",
    ],
    caseLawCited: [
      {
        citation: "Commissioner of Customs Vs. Chinku Exports [2005 (184) ELT A36 (SC)]",
        relevantSections: [],
        citedBy: "Court",
      },
      {
        citation:
          "National Thermal Power Co. Ltd. vs Commissioner Of Income Tax [1998 (99) ELT 200 SC, 1998 229 ITR 383 SC, (1997) 7 SCC 489]",
        relevantSections: [],
        citedBy: "Court",
      },
      // Additional case law citations omitted for brevity
    ],
    lowerCourtFavour: "Party B",
    currentCourtFavour: "Party A",
    nextPlaceOfAppeal: "No Further Appeal",
    precedentSearchTerms: [
      "CTH 85177090 vs CTH 85181000 classification of receivers",
      "Customs Notification No. 57/2017 (S. No. 6A) exemption for Microphones",
      "Customs Notification No. 50/2017 (S. No. 499) exemption for Microphones",
      "CTH 3920 9999 vs CTH 8517 7090 classification of Battery Cover, Back Cover, Camera Lens, Front Cover",
      "burden of proof in fiscal exemptions and classification of goods",
      "acquiescence in tax appeals",
      "interpretation of exemption notifications",
      "Phased Manufacturing Programme (PMP) for mobile phones",
      "Vivo Mobile India - I and II Tribunal Judgments",
      "Commissioner of Customs (Import) Vs M/s Dilip Kumar and Company & Ors.",
    ],
  },
}

// Monetary values from the case
const monetaryData = [
  { name: "Receivers (Short-paid duty)", value: 6297899, category: "Duty" },
  { name: "Microphones (Differential duty)", value: 30128441, category: "Duty" },
  { name: "Receivers (Penalty)", value: 100000, category: "Penalty" },
]

// Timeline data
const timelineData = [
  { date: "Jul 2017 - Jan 2018", event: "Import of goods", category: "Import" },
  { date: "9 Dec 2019", event: "Order 804/2019-AIR", category: "Order" },
  { date: "21 Jan 2020", event: "Order 58/2020", category: "Order" },
  { date: "23 Jan 2020", event: "Order 67/2020-AIR", category: "Order" },
  { date: "28 Feb 2024", event: "CESTAT Decision", category: "Decision" },
]

// Classification comparison data
const classificationData = [
  {
    item: "Receivers",
    assessee: "CTH 85177090",
    department: "CTH 85181000",
    tribunal: "Remanded",
  },
  {
    item: "Microphones",
    assessee: "Eligible for exemption",
    department: "Not eligible",
    tribunal: "Not eligible",
  },
  {
    item: "Covers & Lens",
    assessee: "CTH 8517 7090",
    department: "CTH 3920 9999",
    tribunal: "CTH 8517 7090",
  },
]

// Format large numbers with commas and rupee symbol
const formatCurrency = (value) => {
  return `₹${value.toLocaleString("en-IN")}`
}

export default function LegalCaseViewer() {
  const [expandedCaseLaw, setExpandedCaseLaw] = useState(false)
  const { response } = caseData

  // Show only first 5 case laws unless expanded
  const displayedCaseLaw = expandedCaseLaw ? response.caseLawCited : response.caseLawCited.slice(0, 5)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Customs Classification & Exemption Analysis</h1>
        <p className="text-slate-600 mt-2">
          CESTAT Case Digest: {response.partyA} v. {response.partyB}
        </p>
      </div>

      <Card className="mb-8 border-t-4 border-t-emerald-600 shadow-md">
        <CardHeader className="bg-slate-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {response.partyA} v. {response.partyB}
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                <span className="font-medium">Adjudicating Authority:</span> {response.currentCourtName}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-slate-700 hover:bg-slate-800">CESTAT</Badge>
                <Badge className="bg-slate-700 hover:bg-slate-800">Customs</Badge>
                <Badge className="bg-slate-700 hover:bg-slate-800">Classification</Badge>
              </div>
            </div>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">
              Ruling in favor of: {response.currentCourtFavour}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Appellant/Assessee</p>
                <p className="font-medium">{response.partyA}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Respondent/Department</p>
                <p className="font-medium">{response.partyB}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gavel className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Original Adjudicating Authority</p>
                <p className="font-medium">{response.lowerCourtName}</p>
                <Badge variant="outline" className="mt-1">
                  Original Ruling: {response.lowerCourtFavour}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="summary">Case Brief</TabsTrigger>
          <TabsTrigger value="issues">Classification Issues</TabsTrigger>
          <TabsTrigger value="arguments">Legal Submissions</TabsTrigger>
          <TabsTrigger value="decisions">Tribunal Findings</TabsTrigger>
          <TabsTrigger value="analytics">Tax Analytics</TabsTrigger>
          <TabsTrigger value="precedents">Precedents</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case Summary & Factual Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">{response.factualBackground}</p>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-3">Case Timeline</h3>
                <div className="relative">
                  {/* Timeline visualization */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                  <div className="space-y-6 relative">
                    {timelineData.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            item.category === "Import"
                              ? "bg-blue-100 text-blue-600"
                              : item.category === "Order"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {item.category === "Import" ? (
                            <FileText className="h-4 w-4" />
                          ) : item.category === "Order" ? (
                            <FileCode className="h-4 w-4" />
                          ) : (
                            <Gavel className="h-4 w-4" />
                          )}
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm flex-1">
                          <p className="font-medium">{item.date}</p>
                          <p className="text-slate-600">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-2">Appealability</h3>
                <p className="text-slate-700">{response.nextPlaceOfAppeal}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Classification & Exemption Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Tariff Classification Disputes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-4 py-2 text-left">Item</th>
                        <th className="border px-4 py-2 text-left">Assessee's Classification</th>
                        <th className="border px-4 py-2 text-left">Department's Classification</th>
                        <th className="border px-4 py-2 text-left">Tribunal's Finding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classificationData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="border px-4 py-2 font-medium">{item.item}</td>
                          <td className="border px-4 py-2">{item.assessee}</td>
                          <td className="border px-4 py-2">{item.department}</td>
                          <td className="border px-4 py-2">
                            <Badge
                              className={
                                item.tribunal === item.assessee
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  : item.tribunal === item.department
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }
                            >
                              {item.tribunal}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Legal Questions for Determination</h3>
              <ul className="space-y-4">
                {response.legalIssues.map((issue, index) => (
                  <li key={index} className="bg-slate-50 p-4 rounded-lg border-l-4 border-l-slate-600">
                    <p className="text-slate-700">{issue}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arguments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Legal Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {response.arguments.map((argument, index) => {
                  const isPartyA = argument.startsWith("Party A")
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        isPartyA ? "border-l-emerald-600 bg-emerald-50" : "border-l-amber-600 bg-amber-50"
                      }`}
                    >
                      <h3 className="font-semibold mb-2">
                        {isPartyA ? "Assessee's Submissions" : "Department's Submissions"}
                      </h3>
                      <p className="text-slate-700">
                        {argument.replace(isPartyA ? "Party A Argument: " : "Party B Argument: ", "")}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Key Statutory Provisions & Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Customs Tariff Headings</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline">CTH 85177090</Badge>
                        <span className="text-sm">Parts of telephones for cellular networks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline">CTH 85181000</Badge>
                        <span className="text-sm">Microphones and stands therefor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline">CTH 39209999</Badge>
                        <span className="text-sm">Other plates, sheets, film, foil and strip, of plastics</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Exemption Notifications</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline">No. 57/2017</Badge>
                        <span className="text-sm">S. No. 6A - Specific exemptions for mobile parts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline">No. 50/2017</Badge>
                        <span className="text-sm">S. No. 499 - General exemptions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Tribunal Findings & Ratio Decidendi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {response.decisions.map((decision, index) => (
                  <li key={index} className="bg-slate-50 p-4 rounded-lg border-l-4 border-l-emerald-600">
                    <p className="text-slate-700">{decision}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Key Legal Principles Established</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Burden of Proof</h4>
                    <p className="text-sm text-slate-700">
                      The burden of proving eligibility to exemption notifications lies on the assessee claiming such
                      exemption.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Classification Principles</h4>
                    <p className="text-sm text-slate-700">
                      Parts specifically designed for mobile phones should be classified under the appropriate heading
                      for mobile phone parts.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Acquiescence</h4>
                    <p className="text-sm text-slate-700">
                      Prior acquiescence does not bar an appellant from challenging a matter in appeal when the interest
                      of justice requires it.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Redemption Fine</h4>
                    <p className="text-sm text-slate-700">
                      Redemption fine cannot be imposed without establishing a blameworthy act by the assessee.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Tax Analytics & Financial Implications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Duty & Penalty Analysis</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monetaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip
                          content={
                            <ChartTooltip>
                              <ChartTooltipContent
                                formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                                label="Amount"
                              />
                            </ChartTooltip>
                          }
                        />
                        <Legend />
                        <Bar dataKey="value" name="Amount (₹)" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Financial Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Total Duty Demanded</h4>
                        <span className="text-lg font-semibold text-slate-900">
                          {formatCurrency(6297899 + 30128441)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        <div className="flex justify-between">
                          <span>Receivers (Short-paid duty)</span>
                          <span>{formatCurrency(6297899)}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Microphones (Differential duty)</span>
                          <span>{formatCurrency(30128441)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Total Penalties</h4>
                        <span className="text-lg font-semibold text-slate-900">{formatCurrency(100000)}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-emerald-800">Tax Savings from Favorable Ruling</h4>
                        <span className="text-lg font-semibold text-emerald-800">{formatCurrency(6297899)}</span>
                      </div>
                      <p className="mt-2 text-sm text-emerald-700">
                        Based on remand of Receivers case and favorable ruling on Battery Cover, Back Cover, Camera
                        Lens, Front Cover
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="font-semibold text-lg mb-4">Tax Planning Implications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Classification Strategy</h4>
                    <p className="text-sm text-slate-700">
                      Mobile phone parts should be carefully classified under appropriate CTH 8517 headings with proper
                      technical documentation to support classification.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Exemption Claims</h4>
                    <p className="text-sm text-slate-700">
                      Ensure strict compliance with notification conditions and maintain comprehensive documentation to
                      support exemption eligibility.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Advance Rulings</h4>
                    <p className="text-sm text-slate-700">
                      Consider obtaining advance rulings for complex classification issues to mitigate future disputes
                      and potential duty demands.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precedents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Precedents & Judicial Authorities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {displayedCaseLaw.map((caseLaw, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{caseLaw.citation}</AccordionTrigger>
                    <AccordionContent>
                      <div className="p-3 bg-slate-50 rounded-md">
                        <p className="text-sm text-slate-700">
                          <span className="font-medium">Cited By:</span> {caseLaw.citedBy}
                        </p>
                        {caseLaw.relevantSections && caseLaw.relevantSections.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-slate-700">Relevant Sections:</p>
                            <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                              {caseLaw.relevantSections.map((section, idx) => (
                                <li key={idx}>{section}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {response.caseLawCited.length > 5 && (
                <button
                  onClick={() => setExpandedCaseLaw(!expandedCaseLaw)}
                  className="mt-4 flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {expandedCaseLaw ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show All ({response.caseLawCited.length} Citations)
                    </>
                  )}
                </button>
              )}

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-3">Key Search Terms for Related Precedents</h3>
                <div className="flex flex-wrap gap-2">
                  {response.precedentSearchTerms.map((term, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-3">Landmark Cases on Classification & Exemption</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium">
                      Commissioner of Customs (Import) Vs M/s Dilip Kumar and Company & Ors.
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Established that exemption notifications must be strictly construed, and the burden of proving
                      eligibility lies on the assessee.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h4 className="font-medium">Wood Papers Ltd. Case</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Established principles for interpretation of fiscal statutes and classification of goods.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <div className="text-sm text-slate-500">
                <p>This case analysis is prepared for tax professionals and is not a substitute for legal advice.</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

