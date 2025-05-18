"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Gavel,
  Scale,
  BookOpen,
  Users,
  FileText,
  Upload,
  Check,
  File,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FancyTitle } from "./app/fancy-title"

// This would typically come from an API or props
const caseData = {
  pdf_file: "case-files/level-2/AHMEDABAD_C-373-2010_06-07-2018.pdf",
  response: {
    lowerCourtName: "Commissioner of Customs (Appeals) - Kandla",
    currentCourtName: "Customs, Excise, and Service Tax Appellate Tribunal (CESTAT)",
    partyA: "Revenue (Government)",
    partyB: "M/s Genus Electrotech Ltd",
    factualBackground:
      "The Revenue appealed a decision by the Commissioner of Customs (Appeals) regarding the classification of washing machine parts (specifically, a wash motor). The Revenue argued for classification under Customs Tariff Head (CTH) 84509010 (parts of washing machines), while the importer (Genus Electrotech Ltd) claimed classification under CTH 85012000 (motors). The adjudicating authority initially sided with the Revenue, but the Commissioner of Customs (Appeals) reversed this decision based on Note 2(a) of Section XVI of the Customs Tariff Act, 1975.",
    legalIssues: [
      "Whether the wash motor should be classified under CTH 84509010 (parts of washing machines) or CTH 85012000 (motors) under the Customs Tariff Act, 1975.",
      "Whether the Commissioner of Customs (Appeals)'s reliance on Note 2(a) of Section XVI of the Customs Tariff Act, 1975, was appropriate without first determining the nature of the goods.",
    ],
    arguments: [
      "Party A Argument: The wash motor is specifically designed for washing machines and is not suitable for other equipment.  Therefore, it should be classified as a part of a washing machine under CTH 84509010 based on Note 2(b) of Section XVI of the Customs Tariff Act.",
      "Party B Argument: (Not explicitly stated in document but implied): The wash motor is an independent motor and should be classified as such under CTH 85012000 based on Note 2(a) of Section XVI of the Customs Tariff Act.",
    ],
    decisions: [
      "The CESTAT found that the Commissioner of Customs (Appeals) erred by applying Note 2(a) of Section XVI of the Customs Tariff Act without first determining the nature of the goods (whether it was a general-purpose motor or specifically designed for washing machines).",
      "The CESTAT remanded the case to the Commissioner of Customs (Appeals) to first determine the nature of the goods before classifying them under the appropriate CTH (either 85012000 or 84509010).",
    ],
    caseLawCited: [],
    lowerCourtFavour: "Party B",
    currentCourtFavour: "Party B",
    nextPlaceOfAppeal: "No Further Appeal",
    precedentSearchTerms: [
      "Customs Tariff Act 1975 Section XVI Note 2(a)",
      "Customs Tariff Act 1975 Section XVI Note 2(b)",
      "Classification of washing machine parts",
      "Classification of motors under CTH 84509010",
      "Classification of motors under CTH 85012000",
      "Determination of the nature of goods before classification",
    ],
  },
}

// Similar cases data (using the same structure as caseData)
const similarCases = [
  {
    id: "case-1",
    title: "Oki India Pvt Ltd vs Commissioner of Customs",
    pdf_file: "case-files/level-2/MUMBAI_C-87439-2023_28-11-2023.pdf",
    response: {
      lowerCourtName: "Commissioner of Customs (Appeals), Mumbai – I",
      currentCourtName: "Customs, Excise and Service Tax Appellate Tribunal (CESTAT), Mumbai",
      partyA: "Oki India Pvt Ltd",
      partyB: "Commissioner of Customs (NS-V)",
      factualBackground:
        "Oki India Pvt Ltd imported goods (ATM – Recycler – G8 Automatic banknote deposit & dispense machine) under bill of entry no. 7844805/12.03.2022. They claimed nil duty under tariff item 8472 9030 of First Schedule to Customs Tariff Act, 1975, based on notification no. 12/2012-Cus and notification no. 50/2017-Cus.  The adjudicating authority reclassified the goods under tariff item 8472 9099. The first appellate authority acknowledged eligibility for exemption under notification no. 25/2005-Cus but denied it because it wasn't claimed at the time of assessment.",
      legalIssues: [
        "Whether the classification of the imported goods under tariff item 8472 9099 by the adjudicating authority was correct.",
        "Whether the appellant was entitled to the benefit of notification no. 25/2005-Cus, even though it was not claimed at the time of assessment, in accordance with the Supreme Court's decision in Share Medical Care v. Union of India [2007 (2) TMI 2 SUPREME COURT].",
      ],
      arguments: [
        "Party A Argument: The goods should be classified under tariff item 8472 9030 and are entitled to exemption under notification no. 25/2005-Cus, even though not initially claimed at the time of assessment, citing the Supreme Court decision in Share Medical Care.",
        "Party B Argument: The classification under tariff item 8472 9099 is correct, and the benefit of notification no. 25/2005-Cus cannot be granted as it wasn't claimed during assessment.  Section 149 of Customs Act, 1962, provides for amendment to bill of entry upon application but not exercisable until the claimed notification was clearly held as non-applicable.",
      ],
      decisions: [
        "The CESTAT held that the classification of goods under tariff item 8472 9099 by the adjudicating authority was incorrect; the matter needs to be reconsidered.",
        "The CESTAT ruled that the issue of entitlement to the benefit of notification no. 25/2005-Cus should have been considered by the original authority, even though not initially claimed at the time of assessment. The impugned order was set aside.  The matter must be decided afresh by the original authority.",
      ],
      caseLawCited: [
        {
          citation: "Share Medical Care v. Union of India [2007 (2) TMI 2 SUPREME COURT]",
          relevantSections: [],
          citedBy: "Party A",
        },
      ],
      lowerCourtFavour: "Party B",
      currentCourtFavour: "Party A",
      nextPlaceOfAppeal: "No Further Appeal",
      precedentSearchTerms: [
        "Share Medical Care v. Union of India [2007 (2) TMI 2 SUPREME COURT]",
        "Customs Tariff Act, 1975, tariff item 8472 9030",
        "Customs Tariff Act, 1975, tariff item 8472 9099",
        "notification no. 25/2005-Cus",
        "Section 149 of Customs Act, 1962",
        "ATM - Recycler - G8 Automatic banknote deposit & dispense machine classification",
        "exemption entitlement not claimed at time of assessment",
      ],
    },
  },
  {
    id: "case-2",
    title: "Godrej & Boyce Mfg Co Ltd vs Commissioner of Customs",
    pdf_file: "case-files/level-2/MUMBAI_C-261-2012_15-02-2019.pdf",
    response: {
      lowerCourtName: "Commissioner of Customs (Appeals), Sheva Mumbai-II",
      currentCourtName: "Customs Excise & Service Tax Appellate Tribunal (CESTAT)",
      partyA: "M/s. Godrej & Boyce Mfg Co Ltd",
      partyB: "Commissioner of Customs (Import), Nhava Sheva",
      factualBackground:
        "This case involves three appeals against orders-in-appeal dated January 12, 2012, pertaining to imported goods under bill of entry numbers 846452/17.09.2010, 688697/29.01.2011, and 766755/29.07.2010.  The goods, described as 'L2 corded 20 scrubber', were initially classified under heading no. 8479 8999 of the First Schedule to the Customs Tariff Act, 1975. The original authority reclassified them under heading no. 8508 6000.",
      legalIssues: [
        "Whether the correct classification of the imported goods is under heading no. 8479 8999 ('other machines and mechanical appliances') or heading no. 8508 6000 ('vacuum cleaner') of the First Schedule to the Customs Tariff Act, 1975.",
      ],
      arguments: [
        "Party A Argument: The classification as 'vacuum cleaner' is inaccurate because the product performs multiple functions beyond vacuuming and excludes vacuum cleaners powered by electrical motors.  The declared classification in the bill of entry should be accepted by default, especially given that subsequent consignments were assessed at a lower duty rate based on the appellant's classification.",
        "Party B Argument: The machine is a multi-functional vacuum cleaner equipped with an electric motor, meeting the description of 'vacuum cleaner' in the tariff.  Subsequent assessments based on the appellant's classification are irrelevant to this case.",
      ],
      decisions: [
        "The CESTAT found that the goods, operating as a vacuum cleaner and equipped with an electric motor, fit the description of 'vacuum cleaner' under heading no. 8508 6000.  The CESTAT set aside the impugned orders and allowed the appeals, finding no reason to sustain the classification by the lower authorities. The court's reasoning hinged on the multi-functional nature of the machine, which includes vacuuming, and its use of an electric motor.",
      ],
      caseLawCited: [],
      lowerCourtFavour: "Party B",
      currentCourtFavour: "Party A",
      nextPlaceOfAppeal: "No Further Appeal",
      precedentSearchTerms: [
        "Customs Tariff Act, 1975",
        "heading no. 8479 8999",
        "heading no. 8508 6000",
        "vacuum cleaner classification",
        "multi-functional machine classification",
        "electric motor vacuum cleaner",
      ],
    },
  },
  {
    id: "case-3",
    title: "Kerala Feeds Ltd. vs The Commissioner of Customs",
    pdf_file: "case-files/level-2/BANGALORE_C-22983-2014_27-06-2023.pdf",
    response: {
      lowerCourtName: "Commissioner of Customs (Appeals)",
      currentCourtName: "Customs, Excise & Service Tax Appellate Tribunal (CESTAT)",
      partyA: "M/s. Kerala Feeds Ltd.",
      partyB: "The Commissioner of Customs",
      factualBackground:
        "M/s. Kerala Feeds Ltd. imported spare parts for their animal feed plant.  The Commissioner of Customs (Appeals) classified these spare parts under Customs Tariff Head (CTH) 8436 10 00. The appellant argued that the correct classification should be under CTH 8436 99 00.  The Deputy Commissioner of Customs (Imports), on remand by the Tribunal, had previously classified the spare parts under CTH 8436 1000 (a seeming typo, should be 9900 according to the appellant's argument) in an order dated 02.08.2022. The appellant also presented several orders from the Commissioner(Appeals) classifying parts of animal feed machinery under CTH 8436 10 00.",
      legalIssues: [
        "Whether the spare parts imported for the animal feed plant were correctly classified under Customs Tariff Head 8436 10 00 by the Commissioner of Customs (Appeals) or should have been classified under Customs Tariff Head 8436 99 00 as contended by the appellant.",
      ],
      arguments: [
        "Party A Argument: The spare parts should be classified under CTH 8436 99 00. This is supported by the Deputy Commissioner of Customs (Imports)' order dated 02.08.2022 (and other Commissioner (Appeals) orders).",
        "Party B Argument: The spare parts were correctly classified under CTH 8436 10 00.  The Department relied on the Tribunal's decision in KSE Ltd. Vs. Commissioner of Customs, Cochin, which classified a similar 500 TPD cattle feed manufacturing plant under CTH 8479 89 99.  However, this precedent was deemed irrelevant as the machinery in the current appeal was already classified by the Department under CTH 8436 10 00.",
      ],
      decisions: [
        "The CESTAT held that since the Department itself classified the machine under CTH 8436 10 00, and the Deputy Commissioner and the Commissioner (Appeals) had also classified the spare parts under CTH 8436 99 00, the order of the Commissioner of Customs (Appeals) was not sustainable and was set aside. The appeal was allowed.",
      ],
      caseLawCited: [
        {
          citation: "KSE Ltd. Vs. Commissioner of Customs, Cochin 2017(352) ELT 46 (Tri.-Bang.)",
          relevantSections: [],
          citedBy: "Party B",
        },
      ],
      lowerCourtFavour: "Party B",
      currentCourtFavour: "Party A",
      nextPlaceOfAppeal: "No Further Appeal",
      precedentSearchTerms: [
        "Customs Tariff Head 8436 10 00",
        "Customs Tariff Head 8436 99 00",
        "spare parts classification animal feed plant",
        "KSE Ltd. Vs. Commissioner of Customs, Cochin 2017(352) ELT 46 (Tri.-Bang.)",
      ],
    },
  },
  {
    id: "case-4",
    title: "Antifriction Bearings Corpn. Ltd. vs Collector of Customs",
    pdf_file: "case-files/level-3/2022_12_01_Case_Law___2000__126__E_L_T__1242__Tri__Del___19_04_2000_.pdf",
    response: {
      lowerCourtName: "Additional Collector of Customs, Bombay",
      currentCourtName: "CESTAT (Customs, Excise and Service Tax Appellate Tribunal)",
      partyA: "Antifriction Bearings Corpn. Ltd.",
      partyB: "Collector of Customs, Bombay",
      factualBackground:
        "Antifriction Bearings Corpn. Ltd. imported an Automatic Noise Testing Machine (AD-0100) for ball bearings on May 27, 1991.  They sought clearance under OGL, classifying it under Customs Tariff sub-heading No. 9024.10 with Notifications 26/88 and 14/88. The Additional Collector of Customs assessed the machine under sub-heading 9031.80 (read with Notification No. 118/86),  confiscating it with an option to redeem for Rs. 8 lakhs and imposing a Rs. 2 lakhs penalty under Section 112 of the Customs Act, 1962.  The dispute centers on whether the machine is 'automatic' as claimed by the appellant, given that some functions (loading bearings, quality inspection) involve manual judgment, unlike fully automatic machines.",
      legalIssues: [
        "Whether the imported machine is correctly classified under sub-heading 9031.80 of the Customs Tariff Act, 1975, read with Notification No. 118/86, rather than sub-heading 9024.10 read with Notifications 26/88 and 14/88.",
        "Whether the importer is entitled to the benefit of Notifications 26/88-Cus. and 14/88-Cus. or clearance under OGL.",
        "Whether the imposition of a penalty under Section 112 of the Customs Act, 1962 is warranted.",
        "Whether the redemption fine of Rs. 8 lakhs is justified.",
      ],
      arguments: [
        "Party A Argument: The machine is 'automatic' as defined in relevant notifications and case law, even if some manual steps are involved. They presented expert opinions supporting this classification.  They challenged the Additional Collector's reliance on information obtained without their knowledge.",
        "Party B Argument: The machine is not 'automatic' because some functions are performed manually. They compared the appellant's machine to a fully automated machine from SKF Bearings to highlight the difference in automation levels.",
      ],
      decisions: [
        "The Tribunal held that the machine was correctly classified under sub-heading 9031.80, and the importer was not entitled to the benefits of the Notifications or OGL clearance.",
        "The Tribunal set aside the penalty imposed under Section 112 of the Customs Act, 1962.",
        "The Tribunal reduced the redemption fine to Rs. 6 lakhs from Rs. 8 lakhs, considering the highly technical nature of the dispute and the possibility of a bona fide difference of opinion.",
        "The Tribunal's majority opinion upheld the confiscation of the goods but reduced the redemption fine.",
      ],
      caseLawCited: [
        {
          citation: "K. Mohan & Co. v. Collector, 1984 (15) E.L.T. 430 (Tribunal)",
          relevantSections: [],
          citedBy: "Party A",
        },
        {
          citation: "Ashwin Vanaspati Industries Pvt. Ltd. v. Collector, 1987 (27) E.L.T. 300 (Tribunal)",
          relevantSections: [],
          citedBy: "Party A",
        },
        {
          citation: "Excel Industries Ltd. v. U.O.I., 1989 (25) ECR 491 (Bom.)",
          relevantSections: [],
          citedBy: "Party A",
        },
        {
          citation: "Motilal Lalchand Shah v. L.K. Kaul, 1984 (17) E.L.T. 294 (Guj.)",
          relevantSections: [],
          citedBy: "Party A",
        },
        {
          citation: "N. Anil Kumar v. Collector, 1987 (28) E.L.T. 157 (Tribunal)",
          relevantSections: [],
          citedBy: "Party A",
        },
        {
          citation: "Standard Dye Chem. v. U.O.I., 1980 (6) E.L.T. 181 (Guj.)",
          relevantSections: [],
          citedBy: "Party A",
        },
      ],
      lowerCourtFavour: "Party B",
      currentCourtFavour: "Party B",
      nextPlaceOfAppeal: "High Court",
      precedentSearchTerms: [
        "'Automatic' machine classification Customs Tariff Act 9024.10 vs 9031.80",
        "Notification Nos. 26/88, 14/88, 118/86 interpretation",
        "Section 112 Customs Act 1962 Penalty Justification",
        "Redemption fine calculation Customs Act 1962 Section 125",
        "K. Mohan & Co. v. Collector, 1984 (15) E.L.T. 430",
        "Degree of automation in Customs classification",
      ],
    },
  },
  {
    id: "case-5",
    title: "Collector of Customs vs Premier Mills Stores",
    pdf_file: "case-files/level-3/2022_12_01_Case_Law___1996__84__E_L_T__A49__S_C____20_11_1995_.pdf",
    response: {
      lowerCourtName: "CEGAT",
      currentCourtName: "Supreme Court",
      partyA: "Collector of Customs, Bombay",
      partyB: "Premier Mills Stores",
      factualBackground:
        "The Supreme Court heard Civil Appeal No. 7602 of 1993, filed by the Collector of Customs, Bombay against a CEGAT order (No. C/146/91-B2, dated 14-6-1991) concerning the classification of Tungsten Carbide Twist Drills. The CEGAT had ruled that the drills are classifiable under Heading 82.07 of the Customs Tariff Act, 1975, as 'tools' and not under Heading 98.06 as parts of machine tools.",
      legalIssues: [
        "Whether Tungsten Carbide Twist Drills are classifiable under Heading 82.07 of the Customs Tariff Act, 1975 (as 'tools'), or under Heading 98.06 (as parts of machine tools).",
      ],
      arguments: [
        "Party A Argument: The Collector of Customs argued that the drills should be classified under Heading 98.06.",
        "Party B Argument: Premier Mills Stores argued that the drills should be classified under Heading 82.07.",
      ],
      decisions: [
        "The Supreme Court dismissed the appeal, upholding the CEGAT's decision to classify Tungsten Carbide Twist Drills under Heading 82.07 of the Customs Tariff Act, 1975, based on the reasoning that the Tribunal correctly held that Drills are known in commercial parlance as 'tools' and not as spare parts of drilling machines.",
      ],
      caseLawCited: [],
      lowerCourtFavour: "Party B",
      currentCourtFavour: "Party B",
      nextPlaceOfAppeal: "No Further Appeal",
      precedentSearchTerms: [
        "Customs Tariff Act, 1975",
        "Heading 82.07",
        "Heading 98.06",
        "Tungsten Carbide Twist Drills",
        "classification of tools",
        "spare parts of machine tools",
        "Collector v. Premier Mills Stores - 1992 (57) E.L.T. 197",
        "1996 (84) E.L.T. A49 (S.C.)",
      ],
    },
  },
]

export default function ClauseAndEffect() {
  const [expandedCaseLaw, setExpandedCaseLaw] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [showCaseData, setShowCaseData] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const [selectedSimilarCase, setSelectedSimilarCase] = useState(0)
  const { response } = caseData

  // Show only first 5 case laws unless expanded
  const displayedCaseLaw = expandedCaseLaw ? response.caseLawCited : response.caseLawCited.slice(0, 5)

  // Simulate file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Reset states
      setUploadProgress(0)
      setUploadComplete(false)
      setShowCaseData(false)

      // Simulate progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setUploadComplete(true)
          setIsProcessing(true)

          // Simulate processing time before showing data
          setTimeout(() => {
            setIsProcessing(false)
            setShowCaseData(true)
            setIsLeftPanelCollapsed(true) // Collapse left panel after processing
          }, 1500)
        }
      }, 300)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Fancy Title */}
      <FancyTitle />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Upload Area (Collapsible) */}
        <div
          className={`${isLeftPanelCollapsed ? "w-16" : "w-1/4"} border-r border-gray-200 bg-white transition-all duration-300 flex flex-col`}
        >
          {isLeftPanelCollapsed ? (
            // Collapsed state
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLeftPanelCollapsed(false)}
                  className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 flex flex-col items-center py-6 gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  title="Upload new document"
                  onClick={() => setIsLeftPanelCollapsed(false)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
                  title="View uploaded document"
                >
                  <File className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            // Expanded state
            <>
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <div>
                  <p className="text-gray-500 font-medium">Document Upload</p>
                </div>
                {showCaseData && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLeftPanelCollapsed(true)}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                <div className="w-full max-w-xs">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <File className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Upload Legal Document</h3>
                    <p className="text-sm text-gray-500 mt-1">Upload a PDF file to extract case information</p>
                  </div>

                  <label className="flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-8 h-8 mb-2 text-indigo-600" />
                    <span className="text-sm font-medium">Drop files or click to upload</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf" />
                  </label>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" indicatorClassName="bg-indigo-600" />
                    </div>
                  )}

                  {uploadComplete && (
                    <div className="mt-4 bg-indigo-50 text-indigo-700 p-3 rounded-md flex items-center">
                      <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">PDF uploaded successfully</span>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 flex-shrink-0 animate-spin" />
                      <span className="text-sm font-medium">Processing document...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Removed Recent Documents section */}
            </>
          )}
        </div>

        {/* Main Content Area - Split into Current Case and Similar Cases */}
        {showCaseData ? (
          <div className={`flex-1 flex ${isLeftPanelCollapsed ? "ml-0" : "-ml-1/4"} transition-all duration-300`}>
            {/* Current Case (Left Side when upload panel is collapsed) */}
            <div className="w-1/2 overflow-auto border-r border-gray-200 bg-purple-50/30">
              <div className="p-6">
                {/* Current Case heading */}
                <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-purple-700" />
                  Current Case
                </h2>

                <Card className="mb-6 border-t-4 border-t-purple-600 shadow-sm">
                  <CardHeader className="bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {response.partyA} v. {response.partyB}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          <span className="font-medium">Current Court:</span> {response.currentCourtName}
                        </CardDescription>
                      </div>
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        Favored: {response.currentCourtFavour}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium text-gray-500">Appellant</p>
                          <p>{response.partyA}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium text-gray-500">Respondent</p>
                          <p>{response.partyB}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-100">
                    <TabsTrigger
                      value="summary"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="issues"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Legal Issues
                    </TabsTrigger>
                    <TabsTrigger
                      value="arguments"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Arguments
                    </TabsTrigger>
                    <TabsTrigger
                      value="decisions"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Decisions
                    </TabsTrigger>
                    <TabsTrigger
                      value="precedents"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Case Law
                    </TabsTrigger>
                  </TabsList>

                  {/* Enhanced Summary Tab */}
                  <TabsContent value="summary" className="mt-0">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                          <div className="flex items-start gap-3 mb-4">
                            <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                            <h3 className="text-lg font-medium text-gray-800">Case Summary</h3>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed pl-8">{response.factualBackground}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Enhanced Legal Issues Tab */}
                  <TabsContent value="issues" className="mt-0">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                          <div className="flex items-start gap-3 mb-4">
                            <Scale className="h-5 w-5 text-purple-500 mt-0.5" />
                            <h3 className="text-lg font-medium text-gray-800">Legal Questions</h3>
                          </div>
                          <ul className="space-y-4 pl-8">
                            {response.legalIssues.map((issue, index) => (
                              <li
                                key={index}
                                className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-600 shadow-sm text-sm relative"
                              >
                                <span className="absolute -left-6 top-3 flex items-center justify-center w-5 h-5 bg-purple-600 text-white rounded-full text-xs font-medium">
                                  {index + 1}
                                </span>
                                <p className="text-gray-700">{issue}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Enhanced Arguments Tab */}
                  <TabsContent value="arguments" className="mt-0">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                          <div className="flex items-start gap-3 mb-4">
                            <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                            <h3 className="text-lg font-medium text-gray-800">Party Submissions</h3>
                          </div>
                          <div className="space-y-4 pl-8">
                            {response.arguments.map((argument, index) => {
                              const isPartyA = argument.startsWith("Party A")
                              return (
                                <div
                                  key={index}
                                  className={`p-4 rounded-lg shadow-sm text-sm relative overflow-hidden ${
                                    isPartyA
                                      ? "bg-purple-50 border border-purple-100"
                                      : "bg-amber-50 border border-amber-100"
                                  }`}
                                >
                                  <div
                                    className={`absolute top-0 left-0 w-1.5 h-full ${
                                      isPartyA ? "bg-purple-600" : "bg-amber-600"
                                    }`}
                                  ></div>
                                  <h3
                                    className={`font-semibold mb-2 pl-3 ${
                                      isPartyA ? "text-purple-800" : "text-amber-800"
                                    }`}
                                  >
                                    {isPartyA ? response.partyA : response.partyB}
                                  </h3>
                                  <p className="text-gray-700 pl-3">
                                    {argument.replace(isPartyA ? "Party A Argument: " : "Party B Argument: ", "")}
                                  </p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Enhanced Decisions Tab */}
                  <TabsContent value="decisions" className="mt-0">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                          <div className="flex items-start gap-3 mb-4">
                            <Gavel className="h-5 w-5 text-purple-500 mt-0.5" />
                            <h3 className="text-lg font-medium text-gray-800">Tribunal Findings</h3>
                          </div>
                          <ul className="space-y-4 pl-8">
                            {response.decisions.map((decision, index) => (
                              <li
                                key={index}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm flex items-start gap-3"
                              >
                                <CheckCircle2 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700">{decision}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Enhanced Case Law Tab */}
                  <TabsContent value="precedents" className="mt-0">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                          <div className="flex items-start gap-3 mb-4">
                            <BookOpen className="h-5 w-5 text-purple-500 mt-0.5" />
                            <h3 className="text-lg font-medium text-gray-800">Judicial Authorities</h3>
                          </div>
                          <div className="pl-8">
                            <Accordion type="single" collapsible className="w-full">
                              {displayedCaseLaw.map((caseLaw, index) => (
                                <AccordionItem
                                  key={index}
                                  value={`item-${index}`}
                                  className="mb-2 border border-gray-100 rounded-lg overflow-hidden"
                                >
                                  <AccordionTrigger className="text-left hover:no-underline py-3 px-4 text-sm bg-gray-50">
                                    <div className="flex items-center gap-2">
                                      <BookText className="h-4 w-4 text-purple-500" />
                                      <span className="text-gray-800 font-medium">{caseLaw.citation}</span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 py-3">
                                    <div className="bg-white rounded-md">
                                      <p className="text-sm text-gray-700 flex items-center gap-2">
                                        <span className="font-medium">Cited By:</span>
                                        <Badge variant="outline" className="font-normal">
                                          {caseLaw.citedBy}
                                        </Badge>
                                      </p>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>

                            {response.caseLawCited.length > 5 && (
                              <button
                                onClick={() => setExpandedCaseLaw(!expandedCaseLaw)}
                                className="mt-3 flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm"
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Similar Cases (Right Side) */}
            <div className="w-1/2 overflow-auto bg-teal-50/30">
              <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-teal-900 mb-0 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-700" />
                    Similar Cases
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedSimilarCase((prev) => Math.max(0, prev - 1))}
                      disabled={selectedSimilarCase === 0}
                      className="h-8 w-8"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedSimilarCase((prev) => Math.min(similarCases.length - 1, prev + 1))}
                      disabled={selectedSimilarCase === similarCases.length - 1}
                      className="h-8 w-8"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Case selector without numbers */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                  {similarCases.map((caseItem, index) => (
                    <Button
                      key={index}
                      variant={selectedSimilarCase === index ? "default" : "outline"}
                      className={`whitespace-nowrap ${
                        selectedSimilarCase === index ? "bg-teal-600 hover:bg-teal-700" : "text-gray-700"
                      }`}
                      onClick={() => setSelectedSimilarCase(index)}
                    >
                      <span className="truncate max-w-[200px]">{caseItem.title}</span>
                    </Button>
                  ))}
                </div>

                {/* Selected similar case details */}
                {similarCases[selectedSimilarCase] && (
                  <>
                    <Card className="mb-6 border-t-4 border-t-teal-600 shadow-sm">
                      <CardHeader className="bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-bold">
                              {similarCases[selectedSimilarCase].response.partyA} v.{" "}
                              {similarCases[selectedSimilarCase].response.partyB}
                            </CardTitle>
                            <CardDescription className="mt-1 text-sm">
                              <span className="font-medium">Current Court:</span>{" "}
                              {similarCases[selectedSimilarCase].response.currentCourtName}
                            </CardDescription>
                          </div>
                          <Badge className="bg-teal-600 hover:bg-teal-700">
                            Favored: {similarCases[selectedSimilarCase].response.currentCourtFavour}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-teal-500" />
                            <div>
                              <p className="font-medium text-gray-500">Appellant</p>
                              <p>{similarCases[selectedSimilarCase].response.partyA}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-teal-500" />
                            <div>
                              <p className="font-medium text-gray-500">Respondent</p>
                              <p>{similarCases[selectedSimilarCase].response.partyB}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-100">
                        <TabsTrigger
                          value="summary"
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                        >
                          Summary
                        </TabsTrigger>
                        <TabsTrigger
                          value="issues"
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                        >
                          Legal Issues
                        </TabsTrigger>
                        <TabsTrigger
                          value="arguments"
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                        >
                          Arguments
                        </TabsTrigger>
                        <TabsTrigger
                          value="decisions"
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                        >
                          Decisions
                        </TabsTrigger>
                        <TabsTrigger
                          value="precedents"
                          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                        >
                          Case Law
                        </TabsTrigger>
                      </TabsList>

                      {/* Enhanced Summary Tab */}
                      <TabsContent value="summary" className="mt-0">
                        <Card className="border-none shadow-sm">
                          <CardContent className="pt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                              <div className="flex items-start gap-3 mb-4">
                                <FileText className="h-5 w-5 text-teal-500 mt-0.5" />
                                <h3 className="text-lg font-medium text-gray-800">Case Summary</h3>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed pl-8">
                                {similarCases[selectedSimilarCase].response.factualBackground}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Enhanced Legal Issues Tab */}
                      <TabsContent value="issues" className="mt-0">
                        <Card className="border-none shadow-sm">
                          <CardContent className="pt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                              <div className="flex items-start gap-3 mb-4">
                                <Scale className="h-5 w-5 text-teal-500 mt-0.5" />
                                <h3 className="text-lg font-medium text-gray-800">Legal Questions</h3>
                              </div>
                              <ul className="space-y-4 pl-8">
                                {similarCases[selectedSimilarCase].response.legalIssues.map((issue, index) => (
                                  <li
                                    key={index}
                                    className="bg-teal-50 p-4 rounded-lg border-l-4 border-l-teal-600 shadow-sm text-sm relative"
                                  >
                                    <span className="absolute -left-6 top-3 flex items-center justify-center w-5 h-5 bg-teal-600 text-white rounded-full text-xs font-medium">
                                      {index + 1}
                                    </span>
                                    <p className="text-gray-700">{issue}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Enhanced Arguments Tab */}
                      <TabsContent value="arguments" className="mt-0">
                        <Card className="border-none shadow-sm">
                          <CardContent className="pt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                              <div className="flex items-start gap-3 mb-4">
                                <Users className="h-5 w-5 text-teal-500 mt-0.5" />
                                <h3 className="text-lg font-medium text-gray-800">Party Submissions</h3>
                              </div>
                              <div className="space-y-4 pl-8">
                                {similarCases[selectedSimilarCase].response.arguments.map((argument, index) => {
                                  const isPartyA = argument.startsWith("Party A")
                                  return (
                                    <div
                                      key={index}
                                      className={`p-4 rounded-lg shadow-sm text-sm relative overflow-hidden ${
                                        isPartyA
                                          ? "bg-teal-50 border border-teal-100"
                                          : "bg-rose-50 border border-rose-100"
                                      }`}
                                    >
                                      <div
                                        className={`absolute top-0 left-0 w-1.5 h-full ${
                                          isPartyA ? "bg-teal-600" : "bg-rose-600"
                                        }`}
                                      ></div>
                                      <h3
                                        className={`font-semibold mb-2 pl-3 ${
                                          isPartyA ? "text-teal-800" : "text-rose-800"
                                        }`}
                                      >
                                        {isPartyA
                                          ? similarCases[selectedSimilarCase].response.partyA
                                          : similarCases[selectedSimilarCase].response.partyB}
                                      </h3>
                                      <p className="text-gray-700 pl-3">
                                        {argument.replace(isPartyA ? "Party A Argument: " : "Party B Argument: ", "")}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Enhanced Decisions Tab */}
                      <TabsContent value="decisions" className="mt-0">
                        <Card className="border-none shadow-sm">
                          <CardContent className="pt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                              <div className="flex items-start gap-3 mb-4">
                                <Gavel className="h-5 w-5 text-teal-500 mt-0.5" />
                                <h3 className="text-lg font-medium text-gray-800">Tribunal Findings</h3>
                              </div>
                              <ul className="space-y-4 pl-8">
                                {similarCases[selectedSimilarCase].response.decisions.map((decision, index) => (
                                  <li
                                    key={index}
                                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm flex items-start gap-3"
                                  >
                                    <CheckCircle2 className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-700">{decision}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Enhanced Case Law Tab */}
                      <TabsContent value="precedents" className="mt-0">
                        <Card className="border-none shadow-sm">
                          <CardContent className="pt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-4">
                              <div className="flex items-start gap-3 mb-4">
                                <BookOpen className="h-5 w-5 text-teal-500 mt-0.5" />
                                <h3 className="text-lg font-medium text-gray-800">Judicial Authorities</h3>
                              </div>
                              <div className="pl-8">
                                <Accordion type="single" collapsible className="w-full">
                                  {similarCases[selectedSimilarCase].response.caseLawCited.map((caseLaw, index) => (
                                    <AccordionItem
                                      key={index}
                                      value={`item-${index}`}
                                      className="mb-2 border border-gray-100 rounded-lg overflow-hidden"
                                    >
                                      <AccordionTrigger className="text-left hover:no-underline py-3 px-4 text-sm bg-gray-50">
                                        <div className="flex items-center gap-2">
                                          <BookText className="h-4 w-4 text-teal-500" />
                                          <span className="text-gray-800 font-medium">{caseLaw.citation}</span>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent className="px-4 py-3">
                                        <div className="bg-white rounded-md">
                                          <p className="text-sm text-gray-700 flex items-center gap-2">
                                            <span className="font-medium">Cited By:</span>
                                            <Badge variant="outline" className="font-normal">
                                              {caseLaw.citedBy}
                                            </Badge>
                                          </p>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Initial state - empty content area
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Document Analyzed Yet</h2>
              <p className="text-gray-500 max-w-md">
                Upload a legal document on the left panel to see the extracted information and analysis here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

