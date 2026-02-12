import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  File,
  type LucideIcon,
} from 'lucide-react';

const EXT_ICON_MAP: Record<string, LucideIcon> = {
  /* images */
  jpg: FileImage, jpeg: FileImage, png: FileImage, gif: FileImage,
  webp: FileImage, svg: FileImage, bmp: FileImage, ico: FileImage,
  tiff: FileImage, tif: FileImage, avif: FileImage, heic: FileImage,

  /* video */
  mp4: FileVideo, mov: FileVideo, avi: FileVideo, mkv: FileVideo,
  webm: FileVideo, flv: FileVideo, wmv: FileVideo, m4v: FileVideo,

  /* audio */
  mp3: FileAudio, wav: FileAudio, ogg: FileAudio, flac: FileAudio,
  aac: FileAudio, m4a: FileAudio, wma: FileAudio, opus: FileAudio,

  /* archives */
  zip: FileArchive, rar: FileArchive, '7z': FileArchive, tar: FileArchive,
  gz: FileArchive, bz2: FileArchive, xz: FileArchive, zst: FileArchive,

  /* documents / text */
  pdf: FileText, doc: FileText, docx: FileText, txt: FileText,
  rtf: FileText, odt: FileText, md: FileText, epub: FileText,

  /* spreadsheets */
  xls: FileSpreadsheet, xlsx: FileSpreadsheet, csv: FileSpreadsheet,
  ods: FileSpreadsheet, tsv: FileSpreadsheet,

  /* code */
  js: FileCode, ts: FileCode, jsx: FileCode, tsx: FileCode,
  py: FileCode, java: FileCode, c: FileCode, cpp: FileCode,
  h: FileCode, cs: FileCode, go: FileCode, rs: FileCode,
  rb: FileCode, php: FileCode, html: FileCode, css: FileCode,
  json: FileCode, xml: FileCode, yaml: FileCode, yml: FileCode,
  sh: FileCode, bat: FileCode, sql: FileCode, swift: FileCode,
  kt: FileCode, dart: FileCode, lua: FileCode, r: FileCode,
};

const MIME_PREFIX_MAP: [string, LucideIcon][] = [
  ['image/', FileImage],
  ['video/', FileVideo],
  ['audio/', FileAudio],
  ['text/', FileText],
  ['application/pdf', FileText],
  ['application/zip', FileArchive],
  ['application/x-tar', FileArchive],
  ['application/gzip', FileArchive],
  ['application/x-7z', FileArchive],
  ['application/x-rar', FileArchive],
  ['application/json', FileCode],
  ['application/xml', FileCode],
  ['application/javascript', FileCode],
];

/**
 * Returns the appropriate Lucide icon component for a given filename and optional MIME type.
 */
export function getFileIcon(filename: string, mimeType?: string): LucideIcon {
  // Try extension first
  const ext = filename.includes('.') ? filename.split('.').pop()?.toLowerCase() : undefined;
  if (ext && ext in EXT_ICON_MAP) {
    return EXT_ICON_MAP[ext];
  }

  // Fall back to MIME type prefix matching
  if (mimeType) {
    for (const [prefix, icon] of MIME_PREFIX_MAP) {
      if (mimeType.startsWith(prefix)) {
        return icon;
      }
    }
  }

  return File;
}
