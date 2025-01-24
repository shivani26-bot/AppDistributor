import * as z from "zod";
// const fileValidation = z
//   .any()
//   .refine((file) => file?.length == 1, { message: "File is required." });
//   .refine((file) => /\.(apk|aab)$/i.test(file.name), {
//     message: "File must be an APK or AAB.",
//   });

// part makes the third section (after the second dot) optional. The ? means "zero or one occurrence," allowing the version to be either x.x or x.x.x.

const versionValidation = z.string().regex(/^\d+\.\d+(\.\d+)?$/, {
  message: "Version must follow the format x.x.x (e.g., 1.0.0).",
});

const releaseNotesValidation = z
  .string()
  .max(500, "Release notes must not exceed 500 characters.");

const uploadReleaseSchema = z.object({
  //   file: z.object({
  //     file: z.instanceof(FileList).optional(),
  //   }),
  version: versionValidation,
  releaseNotes: releaseNotesValidation,
});

export default uploadReleaseSchema;
