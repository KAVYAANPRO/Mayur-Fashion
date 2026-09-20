import React, { useState, useEffect, useRef } from 'react';

/* ─── Helper: detect video type from URL ──────────────────── */
function detectType(url) {
  if (!url) return '';
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/vimeo\.com/.test(url))             return 'vimeo';
  if (/cloudinary\.com/.test(url))        return 'cloudinary';
  return 'direct';
}

/* ─── Embed component (read-only preview) ─────────────────── */
function VideoPreview({ url, type }) {
  if (!url) return null;

  if (type === 'youtube' || type === 'vimeo') {
    return (
      <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
        <iframe
          src={url}
          title="Company Video Preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

  // Cloudinary or direct mp4
  return (
    <video
      src={url}
      controls
      style={{ width: '100%', borderRadius: '12px', background: '#000', display: 'block' }}
    />
  );
}

/* ─── Main component ──────────────────────────────────────── */
export default function VideoSettings({ auth }) {
  const [settings, setSettings]         = useState(null);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [uploading, setUploading]       = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [saved, setSaved]               = useState(false);

  /* form fields */
  const [videoUrl, setVideoUrl]         = useState('');
  const [videoTitle, setVideoTitle]     = useState('Our Story');
  const [videoCaption, setVideoCaption] = useState('See how we craft every piece with love.');

  const fileInputRef = useRef(null);

  /* ── Fetch current settings ── */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);
        const data = await res.json();
        setSettings(data);
        setVideoUrl(data.companyVideoUrl || '');
        setVideoTitle(data.companyVideoTitle || 'Our Story');
        setVideoCaption(data.companyVideoCaption || 'See how we craft every piece with love.');
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ── Upload video file to Cloudinary ── */
  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    setUploadProgress(`Uploading "${file.name}" (${(file.size / 1024 / 1024).toFixed(1)} MB) to Cloudinary…`);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-video`, {
        method: 'POST',
        headers: { 'x-auth-token': auth.token },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setVideoUrl(data.videoUrl);
      setUploadProgress('✅ Video uploaded! Click "Save Video Settings" to publish it.');
    } catch (err) {
      setUploadProgress('❌ Upload failed. Please try again or paste a URL instead.');
    } finally {
      setUploading(false);
    }
  };

  /* ── Save settings to DB ── */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': auth.token },
        body: JSON.stringify({
          companyVideoUrl:     videoUrl,
          companyVideoTitle:   videoTitle,
          companyVideoCaption: videoCaption,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Remove video ── */
  const handleRemove = async () => {
    if (!window.confirm('Remove the company video from the website?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/settings/video`, {
        method: 'DELETE',
        headers: { 'x-auth-token': auth.token },
      });
      setVideoUrl('');
      setSettings((prev) => ({ ...prev, companyVideoUrl: '', companyVideoType: '' }));
    } catch (err) {
      alert('Failed to remove video.');
    }
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading settings…</div>;

  const currentType = detectType(videoUrl);

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '820px' }}>
      <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>Company Video</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.92rem' }}>
        This video appears on the landing page below the hero tagline. You can paste a YouTube / Vimeo link, or upload a video file directly.
      </p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ── Option A: Paste URL ──────────────────────────────── */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>🔗</span> Option A — Paste a YouTube / Vimeo URL
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Upload your video to YouTube (set as <strong>Unlisted</strong> so only people with the link can see it) then paste the URL here. Supports: youtube.com/watch?v=..., youtu.be/..., vimeo.com/...
          </p>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{ fontFamily: 'monospace', fontSize: '0.88rem' }}
            />
          </div>
          {currentType && (
            <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              ✅ Detected: {currentType.charAt(0).toUpperCase() + currentType.slice(1)} video
            </div>
          )}
        </div>

        {/* ── Option B: Upload file ────────────────────────────── */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>☁️</span> Option B — Upload Video File (Cloudinary)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Upload an MP4, MOV, WEBM, or AVI file directly. It will be stored on Cloudinary (already set up on your account). No YouTube account needed.
            <br /><strong>Note:</strong> Large video files may take 1–2 minutes to upload.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/mov,video/avi,video/webm,video/mkv"
            onChange={handleVideoFileUpload}
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="btn-outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ minHeight: '44px', fontSize: '0.9rem', gap: '8px' }}
          >
            {uploading ? '⏳ Uploading…' : '📁 Choose Video File to Upload'}
          </button>

          {uploadProgress && (
            <div style={{
              marginTop: '10px', padding: '10px 14px', borderRadius: '8px',
              background: uploadProgress.startsWith('✅') ? 'rgba(37,211,102,0.1)' : 'rgba(239,35,60,0.08)',
              color: uploadProgress.startsWith('✅') ? '#15803d' : uploadProgress.startsWith('❌') ? '#dc2626' : 'var(--text-muted)',
              fontSize: '0.84rem', fontWeight: 600
            }}>
              {uploadProgress}
            </div>
          )}
        </div>

        {/* ── Video Metadata ─────────────────────────────────── */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>📝 Display Settings</h3>
          <div className="form-group">
            <label>Section Title (shown above the video)</label>
            <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g. Our Story" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Caption (shown below the title)</label>
            <input type="text" value={videoCaption} onChange={(e) => setVideoCaption(e.target.value)}
              placeholder="e.g. See how we craft every piece with love." />
          </div>
        </div>

        {/* ── Live Preview ──────────────────────────────────── */}
        {videoUrl && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>👁️ Live Preview</h3>
            <VideoPreview url={videoUrl} type={currentType} />
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '4px' }}>{videoTitle}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{videoCaption}</div>
              </div>
              <button type="button" className="btn-danger"
                onClick={handleRemove}
                style={{ alignSelf: 'flex-start', fontSize: '0.82rem', padding: '8px 16px', minHeight: '36px', whiteSpace: 'nowrap' }}>
                🗑 Remove Video
              </button>
            </div>
          </div>
        )}

        {/* ── Save Button ───────────────────────────────────── */}
        <button type="submit" className="btn-primary"
          disabled={saving}
          style={{ padding: '0.9rem', fontSize: '1rem', opacity: saving ? 0.7 : 1 }}>
          {saved ? '✅ SAVED SUCCESSFULLY!' : saving ? 'SAVING…' : '💾 SAVE VIDEO SETTINGS'}
        </button>

      </form>
    </div>
  );
}
