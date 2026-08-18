import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileJson,
  FileType,
  FileCog,
  FileKey,
  FileTerminal,
  Presentation,
  Database,
  Package,
  Palette,
  Box,
  ScrollText,
  Captions,
  File,
  type LucideIcon,
} from 'lucide-react';

const EXT_ICON_MAP: Record<string, LucideIcon> = {
  /* images */
  jpg: FileImage, jpeg: FileImage, png: FileImage, gif: FileImage,
  webp: FileImage, svg: FileImage, bmp: FileImage, ico: FileImage,
  tiff: FileImage, tif: FileImage, avif: FileImage, heic: FileImage,
  heif: FileImage, jfif: FileImage,

  /* video */
  mp4: FileVideo, mov: FileVideo, avi: FileVideo, mkv: FileVideo,
  webm: FileVideo, flv: FileVideo, wmv: FileVideo, m4v: FileVideo,
  mpg: FileVideo, mpeg: FileVideo, '3gp': FileVideo,

  /* subtitles */
  srt: Captions, vtt: Captions, ass: Captions, ssa: Captions, sub: Captions,

  /* audio */
  mp3: FileAudio, wav: FileAudio, ogg: FileAudio, flac: FileAudio,
  aac: FileAudio, m4a: FileAudio, wma: FileAudio, opus: FileAudio,
  aiff: FileAudio, mid: FileAudio, midi: FileAudio,

  /* archives */
  zip: FileArchive, rar: FileArchive, '7z': FileArchive, tar: FileArchive,
  gz: FileArchive, bz2: FileArchive, xz: FileArchive, zst: FileArchive,
  tgz: FileArchive,

  /* disk images / installers */
  iso: Package, img: Package, dmg: Package, pkg: Package,
  exe: Package, msi: Package, deb: Package, rpm: Package,
  apk: Package, appimage: Package,

  /* documents / text */
  pdf: FileText, doc: FileText, docx: FileText, txt: FileText,
  rtf: FileText, odt: FileText, md: FileText, epub: FileText,
  mobi: FileText, azw3: FileText, pages: FileText,

  /* presentations */
  ppt: Presentation, pptx: Presentation, odp: Presentation, key: Presentation,

  /* spreadsheets */
  xls: FileSpreadsheet, xlsx: FileSpreadsheet, csv: FileSpreadsheet,
  ods: FileSpreadsheet, tsv: FileSpreadsheet, numbers: FileSpreadsheet,

  /* structured data / config */
  json: FileJson, json5: FileJson, jsonl: FileJson,
  yaml: FileCog, yml: FileCog, toml: FileCog, ini: FileCog,
  env: FileCog, conf: FileCog, cfg: FileCog, xml: FileCog,
  plist: FileCog,

  /* databases */
  sql: Database, db: Database, sqlite: Database, sqlite3: Database,
  mdb: Database, accdb: Database,

  /* fonts */
  ttf: FileType, otf: FileType, woff: FileType, woff2: FileType, eot: FileType,

  /* design */
  psd: Palette, ai: Palette, sketch: Palette, fig: Palette,
  xd: Palette, indd: Palette, eps: Palette,

  /* 3D / CAD */
  obj: Box, fbx: Box, stl: Box, blend: Box, gltf: Box, glb: Box,
  dwg: Box, dxf: Box, '3ds': Box,

  /* logs */
  log: ScrollText,

  /* scripts / shell */
  sh: FileTerminal, bat: FileTerminal, ps1: FileTerminal, cmd: FileTerminal,
  zsh: FileTerminal, bash: FileTerminal,

  /* keys / certs */
  pem: FileKey, crt: FileKey, cer: FileKey, pfx: FileKey,
  p12: FileKey, gpg: FileKey, asc: FileKey, pub: FileKey,

  /* code */
  js: FileCode, ts: FileCode, jsx: FileCode, tsx: FileCode,
  py: FileCode, java: FileCode, c: FileCode, cpp: FileCode,
  h: FileCode, hpp: FileCode, cs: FileCode, go: FileCode, rs: FileCode,
  rb: FileCode, php: FileCode, html: FileCode, htm: FileCode, css: FileCode,
  scss: FileCode, sass: FileCode, less: FileCode, vue: FileCode,
  swift: FileCode, kt: FileCode, dart: FileCode, lua: FileCode, r: FileCode,
  pl: FileCode, scala: FileCode, ex: FileCode, exs: FileCode, elm: FileCode,
  clj: FileCode, hs: FileCode, vim: FileCode, dockerfile: FileCode,
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
  ['application/vnd.ms-powerpoint', Presentation],
  ['application/vnd.openxmlformats-officedocument.presentationml', Presentation],
  ['application/vnd.ms-excel', FileSpreadsheet],
  ['application/vnd.openxmlformats-officedocument.spreadsheetml', FileSpreadsheet],
  ['application/json', FileJson],
  ['application/xml', FileCog],
  ['application/x-sql', Database],
  ['font/', FileType],
  ['application/font', FileType],
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
