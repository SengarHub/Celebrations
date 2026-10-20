import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, HelpCircle, Eye } from 'lucide-react';
import { extractGoogleDriveId, formatMediaUrl } from '../utils/googleDriveHelper';

interface GoogleDriveGuideModalProps {
  onClose: () => void;
  onAddConvertedMemory?: (url: string, type: 'image' | 'video') => void;
}

export const GoogleDriveGuideModal: React.FC<GoogleDriveGuideModalProps> = ({
  onClose
}) => {
  const [testUrl, setTestUrl] = useState('');
  const [detectedType, setDetectedType] = useState<'image' | 'video'>('image');
  const [copiedCode, setCopiedCode] = useState(false);

  const driveId = extractGoogleDriveId(testUrl);
  const directLink = driveId ? formatMediaUrl(testUrl, detectedType) : '';

  const sampleSnippet = `// In src/data/keepsakeData.ts:
// Simply paste your Google Drive link here:
mediaUrl: "https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID/view?usp=sharing",
mediaType: "image", // or "video"`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#EDDCBA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F2E4D5] mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#8C3A24] font-semibold uppercase tracking-wider mb-1">
              <span>📁</span>
              <span>Google Drive Integration Guide</span>
            </div>
            <h3 className="text-xl font-royal font-bold text-[#4A1D13]">
              How to Plug in Your Google Drive Photos & Videos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A6A58] hover:text-[#4A1D13] rounded-full hover:bg-[#FAF4ED] transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Simple Steps */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-white rounded-2xl border border-[#F3E5D7] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#8C3A24] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#4A1D13]">Set Google Drive File Access to "Anyone with the link"</h4>
              <p className="text-xs text-[#6B5E51] mt-0.5">
                In Google Drive, right-click your photo or video &gt; <strong>Share</strong> &gt; Under "General access", select <strong>"Anyone with the link can view"</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#F3E5D7] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#8C3A24] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#4A1D13]">Copy Link and Paste into the App or Code</h4>
              <p className="text-xs text-[#6B5E51] mt-0.5">
                The link looks like: <code className="bg-[#FAF3EA] px-1.5 py-0.5 rounded text-[11px] text-[#8C3A24]">https://drive.google.com/file/d/1AbC.../view?usp=sharing</code>. The app automatically detects the Drive ID and streams it smoothly!
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#F3E5D7] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#8C3A24] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#4A1D13]">GitHub Deployment Note</h4>
              <p className="text-xs text-[#6B5E51] mt-0.5">
                To keep permanent links when hosting on GitHub Pages, open <code className="bg-[#FAF3EA] px-1.5 py-0.5 rounded text-[11px] text-[#8C3A24]">src/data/keepsakeData.ts</code> and update the <code className="bg-[#FAF3EA] px-1.5 py-0.5 rounded text-[11px] text-[#8C3A24]">mediaUrl</code> fields.
              </p>
            </div>
          </div>
        </div>

        {/* Live Drive Link Tester */}
        <div className="p-5 bg-[#FAF4ED] rounded-2xl border border-[#EBD6C1] mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A3620] mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>Interactive Link Tester & Instant Converter</span>
          </h4>

          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="Paste your Google Drive link here to test..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDC6B0] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20"
              />
            </div>

            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 text-[#5C5248]">
                <input
                  type="radio"
                  name="detectedType"
                  checked={detectedType === 'image'}
                  onChange={() => setDetectedType('image')}
                  className="accent-[#8C3A24]"
                />
                <span>Photo / Image</span>
              </label>
              <label className="flex items-center gap-1.5 text-[#5C5248]">
                <input
                  type="radio"
                  name="detectedType"
                  checked={detectedType === 'video'}
                  onChange={() => setDetectedType('video')}
                  className="accent-[#8C3A24]"
                />
                <span>Video Clip</span>
              </label>
            </div>

            {driveId ? (
              <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-800 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Valid Google Drive ID: {driveId}</span>
                </div>
                <div className="text-[11px] text-[#6B5E51] break-all">
                  Direct Web Stream: <code className="bg-stone-100 p-1 rounded text-stone-800">{directLink}</code>
                </div>

                {/* Preview Box */}
                <div className="mt-2 rounded-lg overflow-hidden border border-stone-200 max-h-40 flex items-center justify-center bg-stone-100">
                  {detectedType === 'image' ? (
                    <img
                      src={directLink}
                      alt="Drive Preview"
                      className="max-h-40 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <iframe
                      src={directLink}
                      className="w-full h-36 border-0"
                      title="Drive Video Preview"
                    />
                  )}
                </div>
              </div>
            ) : testUrl ? (
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                Please make sure the link is from Google Drive containing a valid file ID.
              </div>
            ) : null}
          </div>
        </div>

        {/* Code Snippet Helper */}
        <div className="p-4 bg-stone-900 rounded-2xl text-stone-200 text-xs font-mono relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-stone-400">
            <span>Code Reference for GitHub Hosting</span>
            <button
              onClick={copyCode}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-[11px] text-amber-200 whitespace-pre-wrap">{sampleSnippet}</pre>
        </div>

      </div>
    </div>
  );
};
