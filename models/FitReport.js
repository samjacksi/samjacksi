import mongoose from 'mongoose';

// One saved run of the resume-to-job-description checker.
//
// Deliberately NOT stored:
// - the resume text (personal data, and the server does not need it again)
// - email and phone numbers found in the resume
// - the full job description (a SHA-256 hash is kept so repeat runs can be grouped)
// - the labd API key
//
// Stored: the scores, which skill terms matched or were missing, the feedback
// lines, and the written report that labd produced.

const scoreField = { type: Number, required: true, min: 0, max: 100 };

const fitReportSchema = new mongoose.Schema(
  {
    jobDescriptionHash: { type: String, required: true, index: true, match: /^[a-f0-9]{64}$/ },

    overallScore: scoreField,
    breakdown: {
      match: scoreField,      // keyword match, 60% of overall
      structure: scoreField,  // standard sections present, 25%
      impact: scoreField,     // numbers showing results, 15%
    },

    keywordCount: { type: Number, required: true, min: 0 },
    matchedTerms: { type: [String], default: [] }, // job terms the resume covers
    missingTerms: { type: [String], default: [] }, // job terms the resume does not mention

    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },   // the changes to make next

    labdReport: { type: String, default: '' },     // Markdown report from labd
  },
  { timestamps: true }
);

export const FitReport = mongoose.model('FitReport', fitReportSchema);
