Add-Type -AssemblyName System.Drawing

function Get-ImgB64 {
  param($path, $maxW = 520, $quality = 68)
  $img   = [System.Drawing.Image]::FromFile((Resolve-Path $path))
  $ratio = [Math]::Min($maxW / $img.Width, $maxW / $img.Height)
  if ($ratio -ge 1) { $ratio = 1 }
  $newW  = [int]($img.Width  * $ratio)
  $newH  = [int]($img.Height * $ratio)
  $bmp   = New-Object System.Drawing.Bitmap($newW, $newH)
  $g     = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $newW, $newH)
  $g.Dispose(); $img.Dispose()
  $ms    = New-Object System.IO.MemoryStream
  $enc   = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
  $ep    = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($ms, $enc, $ep)
  $bmp.Dispose()
  $bytes = $ms.ToArray(); $ms.Dispose()
  return 'data:image/jpeg;base64,' + [Convert]::ToBase64String($bytes)
}

$logo      = Get-ImgB64 'public\logo.jpeg'           -maxW 300 -quality 78
$esp1      = Get-ImgB64 'public\Espacio1.jpeg'        -maxW 600 -quality 70
$esp2      = Get-ImgB64 'public\Espacio2.jpeg'        -maxW 600 -quality 70
$esp3      = Get-ImgB64 'public\Espacio3.jpeg'        -maxW 600 -quality 70
$esp5      = Get-ImgB64 'public\Espacio5.jpeg'        -maxW 900 -quality 65
$fotoale   = Get-ImgB64 'public\FotoAle.jpeg'         -maxW 440 -quality 74
$agnes     = Get-ImgB64 'public\Agnes.jpg'            -maxW 440 -quality 74
$clases    = Get-ImgB64 'public\clasessemanales.jpg'  -maxW 520 -quality 70
$liderazgo = Get-ImgB64 'public\CursoLiderazgo.jpg'   -maxW 520 -quality 68
$cuencos   = Get-ImgB64 'public\Cuencos.jpeg'         -maxW 520 -quality 68

Write-Host "Images loaded: logo=$($logo.Length) esp5=$($esp5.Length) agnes=$($agnes.Length)"

$css = @'
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --purple:    #4a2d8a;
  --purple-md: #6b47b8;
  --purple-lt: #ede8f9;
  --orange:    #c8680a;
  --orange-lt: #fef3c7;
  --green:     #3d6b4a;
  --green-lt:  #e8f5ec;
  --magenta:   #7a2a5f;
  --gold:      #b8901f;
  --bg:        #f8f6fc;
  --surface:   #f0ecf8;
  --border:    #ddd6f0;
  --text:      #1a1030;
  --muted:     #5c5272;
  --white:     #ffffff;
  --dark-bg:   #120a22;
  --dark-mid:  #1e1238;
}
body { font-family: Georgia, 'Times New Roman', serif; background: var(--bg); color: var(--text); line-height: 1.65; font-size: 14px; }
.sans { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
.page { max-width: 900px; margin: 0 auto; padding: 0 36px; }
.section { padding: 72px 0; }
.divider { border: none; border-top: 1px solid var(--border); margin: 0; }
.overline { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
h2.st { font-size: 38px; font-weight: 700; line-height: 1.15; color: var(--text); margin-bottom: 10px; }
.ap { color: var(--purple-md); }
.ao { color: var(--orange); }
.ag { color: var(--green); }
.lead { font-size: 17px; color: var(--muted); line-height: 1.8; max-width: 560px; }
.bt { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13.5px; color: var(--muted); line-height: 1.75; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
/* HERO */
.hero { position: relative; min-height: 600px; overflow: hidden; display: flex; align-items: center; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(18,10,34,0.90) 0%, rgba(30,18,56,0.82) 55%, rgba(16,28,16,0.78) 100%); }
.hero-inner { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; padding: 88px 36px 88px; width: 100%; }
.hero-badge { display: inline-block; background: rgba(184,144,31,0.18); border: 1px solid rgba(184,144,31,0.35); color: #f0d98a; font-family: 'Segoe UI', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; padding: 6px 18px; border-radius: 100px; margin-bottom: 30px; }
.hero h1 { font-size: 68px; font-weight: 700; line-height: 1.05; letter-spacing: -1.5px; color: white; margin-bottom: 6px; }
.hero h1 span { color: #c9b8f5; }
.hero-sub { font-size: 18px; color: rgba(255,255,255,0.60); line-height: 1.75; margin-top: 18px; max-width: 500px; }
.hero-logo-wrap { position: absolute; right: 56px; top: 50%; transform: translateY(-50%); z-index: 3; }
.hero-logo-img { width: 168px; height: 168px; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.20); box-shadow: 0 0 60px rgba(107,71,184,0.55); }
.hero-logo-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-meta { display: flex; gap: 40px; margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.12); flex-wrap: wrap; }
.hml { font-family: 'Segoe UI', sans-serif; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.38); font-weight: 700; margin-bottom: 3px; }
.hmv { font-size: 14px; color: rgba(255,255,255,0.88); }
/* Strip */
.strip { background: var(--purple); }
.strip-inner { max-width: 900px; margin: 0 auto; padding: 0 36px; display: flex; }
.strip-item { flex: 1; padding: 22px 28px; border-right: 1px solid rgba(255,255,255,0.14); }
.strip-item:first-child { padding-left: 0; }
.strip-item:last-child { border-right: none; }
.sl { font-family: 'Segoe UI', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.42); margin-bottom: 3px; }
.sv { font-size: 15px; color: white; }
/* Image utils */
.brief-img-wrap { border-radius: 24px; overflow: hidden; box-shadow: 0 12px 48px rgba(74,45,138,0.2); position: relative; }
.brief-img-wrap img { width: 100%; height: 380px; object-fit: cover; display: block; }
.bri-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,10,34,0.5) 0%, transparent 50%); }
.bri-badge { position: absolute; bottom: 20px; left: 20px; background: rgba(107,71,184,0.88); color: white; font-family: 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; padding: 8px 16px; border-radius: 100px; }
/* Gallery */
.gal-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 230px 230px; gap: 14px; margin-top: 28px; }
.gal-item { border-radius: 18px; overflow: hidden; }
.gal-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gal-tall { grid-row: span 2; }
/* Color palette */
.palette-row { display: flex; gap: 16px; margin-top: 28px; flex-wrap: wrap; }
.swatch { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.sw { width: 68px; height: 68px; border-radius: 18px; }
.sw-lbl { font-family: 'Segoe UI', sans-serif; font-size: 10px; color: var(--muted); text-align: center; font-weight: 600; line-height: 1.3; }
.sw-hex { font-family: monospace; font-size: 9px; color: #9e94b8; }
/* Type specimen */
.type-spec { background: var(--white); border: 1px solid var(--border); border-radius: 22px; padding: 36px; margin-top: 28px; }
.trow + .trow { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--border); }
.tm { font-family: 'Segoe UI', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.sp1 { font-size: 48px; font-weight: 700; line-height: 1.1; color: var(--text); }
.sp2 { font-size: 30px; color: var(--text); }
.sp3 { font-size: 17px; color: var(--muted); }
.sp4 { font-family: 'Segoe UI', sans-serif; font-size: 12px; font-weight: 600; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
/* Process */
.proc-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; margin-top: 28px; }
.proc-card { border-radius: 20px; padding: 28px 22px; border: 1px solid; }
.pc-step { font-family: 'Segoe UI', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
.pc-ico { width: 48px; height: 48px; border-radius: 50%; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; }
.pc-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.pc-sub { font-family: 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
.pc-desc { font-family: 'Segoe UI', sans-serif; font-size: 12px; color: var(--muted); line-height: 1.65; }
/* Accordion */
.acc-list { margin-top: 28px; display: flex; flex-direction: column; gap: 10px; }
.acc-item { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; }
.acc-item.open { border-color: rgba(107,71,184,0.35); box-shadow: 0 4px 20px rgba(107,71,184,0.1); }
.acc-left { display: flex; align-items: center; gap: 14px; }
.acc-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.acc-ttl { font-size: 17px; color: var(--text); }
.acc-desc { font-family: 'Segoe UI', sans-serif; font-size: 12px; color: var(--muted); margin-top: 4px; }
.acc-chev { width: 12px; height: 12px; border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted); transform: rotate(45deg); flex-shrink: 0; margin-right: 4px; }
.acc-chev.up { transform: rotate(-135deg); }
/* Team */
.team-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; margin-top: 28px; }
.team-card { border-radius: 22px; overflow: hidden; border: 1px solid var(--border); background: var(--white); }
.team-img { height: 220px; overflow: hidden; background: var(--surface); display: flex; align-items: center; justify-content: center; }
.team-img img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.team-placeholder { width: 64px; height: 64px; border-radius: 50%; background: var(--border); }
.team-info { padding: 18px; }
.team-name { font-size: 18px; color: var(--text); margin-bottom: 4px; }
.team-role { font-family: 'Segoe UI', sans-serif; font-size: 12px; color: var(--purple-md); font-weight: 600; }
/* Courses */
.course-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; margin-top: 28px; }
.course-card { border-radius: 22px; overflow: hidden; background: var(--white); border: 1px solid var(--border); }
.course-img { height: 200px; overflow: hidden; position: relative; }
.course-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.course-badge { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.course-body { padding: 20px 18px; }
.course-title { font-size: 18px; color: var(--text); margin-bottom: 8px; }
.course-desc { font-family: 'Segoe UI', sans-serif; font-size: 12px; color: var(--muted); line-height: 1.65; }
/* Tech pills */
.tech-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.tech-pill { background: var(--white); border: 1px solid var(--border); border-radius: 100px; padding: 7px 18px; font-family: 'Segoe UI', sans-serif; font-size: 12px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 7px; }
.td { width: 8px; height: 8px; border-radius: 50%; }
/* Decisions */
.dec-list { display: flex; flex-direction: column; gap: 22px; }
.dec-item { display: flex; gap: 18px; }
.dec-ico { width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.dec-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.dec-desc { font-family: 'Segoe UI', sans-serif; font-size: 13px; color: var(--muted); line-height: 1.65; }
/* Dark section */
.dark-sec { background: var(--dark-bg); padding: 80px 36px; }
.dark-inner { max-width: 900px; margin: 0 auto; }
.res-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 48px; }
.res-card { background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.1); border-radius: 22px; padding: 30px 22px; text-align: center; }
.res-num { font-size: 48px; font-weight: 700; line-height: 1; margin-bottom: 10px; }
.res-desc { font-family: 'Segoe UI', sans-serif; font-size: 12px; color: rgba(255,255,255,0.48); line-height: 1.55; }
/* Footer */
.proj-footer { border-top: 1px solid var(--border); padding: 28px 36px; text-align: center; font-family: 'Segoe UI', sans-serif; font-size: 11px; color: #9e94b8; }
'@

$html = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Espacio MAT - Web Design Case Study</title>
<style>
$css
</style>
</head>
<body>

<div class="hero">
  <div class="hero-bg" style="background-image:url('ESP5_SRC');"></div>
  <div class="hero-overlay"></div>
  <div class="hero-inner">
    <div class="hero-badge">Web Design - Case Study - 2025</div>
    <h1>Espacio <span>MAT</span></h1>
    <p class="hero-sub">Design and development of a website for a holistic center blending Gestalt Psychology and Ontological Coaching.</p>
    <div class="hero-logo-wrap"><div class="hero-logo-img"><img src="LOGO_SRC" alt="Logo" /></div></div>
    <div class="hero-meta">
      <div><div class="hml">Client</div><div class="hmv">Espacio MAT</div></div>
      <div><div class="hml">Type</div><div class="hmv">Website - Landing Page</div></div>
      <div><div class="hml">Stack</div><div class="hmv">Next.js - Tailwind CSS</div></div>
      <div><div class="hml">Agency</div><div class="hmv">ViBolab</div></div>
      <div><div class="hml">Year</div><div class="hmv">2025</div></div>
    </div>
  </div>
</div>

<div class="strip">
  <div class="strip-inner">
    <div class="strip-item"><div class="sl">Discipline</div><div class="sv">UI / UX Design</div></div>
    <div class="strip-item"><div class="sl">Role</div><div class="sv">Design + Development</div></div>
    <div class="strip-item"><div class="sl">Platform</div><div class="sv">Web - Desktop + Mobile</div></div>
    <div class="strip-item"><div class="sl">Deploy</div><div class="sv">Vercel</div></div>
  </div>
</div>

<div class="page"><div class="section">
  <div class="two">
    <div>
      <p class="overline">01 - Brief</p>
      <h2 class="st">The <span class="ap">Challenge</span></h2>
      <p class="lead" style="margin-top:16px;">Build a digital presence that conveys warmth, depth and trust for a holistic center that fuses therapy, coaching and wellness.</p>
      <div style="margin-top:28px;display:flex;flex-direction:column;gap:14px;">
        <p class="bt">Espacio MAT needed a site reflecting its integrative approach: the emotional subtlety of <strong style="color:var(--purple-md);">Gestalt Psychology</strong> and the action-oriented nature of <strong style="color:var(--orange);">Ontological Coaching</strong>.</p>
        <p class="bt">The challenge was to translate that duality into a coherent visual language: organic yet structured, warm yet professional, mystical yet accessible.</p>
        <p class="bt">The site also had to work as a conversion tool, guiding visitors from initial curiosity to direct contact via WhatsApp.</p>
      </div>
    </div>
    <div>
      <div class="brief-img-wrap">
        <img src="ESP1_SRC" alt="Espacio MAT Interior" />
        <div class="bri-overlay"></div>
        <div class="bri-badge sans">Physical space -- Buenos Aires, Argentina</div>
      </div>
    </div>
  </div>
</div></div>

<hr class="divider" />

<div class="page"><div class="section">
  <p class="overline">02 - The Space</p>
  <h2 class="st">A place designed for <span class="ag">Transformation</span></h2>
  <p class="bt" style="max-width:600px;margin-top:10px;">Every detail of the physical space was captured and showcased through an infinite auto-scroll gallery that pauses on hover.</p>
  <div class="gal-grid">
    <div class="gal-item gal-tall"><img src="ESP2_SRC" alt="Space 2" /></div>
    <div class="gal-item"><img src="ESP3_SRC" alt="Space 3" /></div>
    <div class="gal-item"><img src="ESP1_SRC" alt="Space 1" /></div>
    <div class="gal-item"><img src="CLASES_SRC" alt="Weekly classes" /></div>
  </div>
</div></div>

<hr class="divider" />

<div style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
<div class="page"><div class="section">
  <p class="overline">03 - Visual Identity</p>
  <h2 class="st">Color <span class="ap">Palette</span></h2>
  <p class="bt" style="max-width:600px;margin-top:10px;">Each color was extracted directly from the client's mandala logo using oklch() for maximum perceptual accuracy. Purple evokes spiritual depth; orange, energy and action; green, growth and nature.</p>
  <div class="palette-row">
    <div class="swatch"><div class="sw" style="background:#4a2d8a;"></div><div class="sw-lbl">Deep<br>Purple</div><div class="sw-hex">#4A2D8A</div></div>
    <div class="swatch"><div class="sw" style="background:#6b47b8;"></div><div class="sw-lbl">Mid<br>Purple</div><div class="sw-hex">#6B47B8</div></div>
    <div class="swatch"><div class="sw" style="background:#c8680a;"></div><div class="sw-lbl">Orange<br>Action</div><div class="sw-hex">#C8680A</div></div>
    <div class="swatch"><div class="sw" style="background:#3d6b4a;"></div><div class="sw-lbl">Forest<br>Green</div><div class="sw-hex">#3D6B4A</div></div>
    <div class="swatch"><div class="sw" style="background:#7a2a5f;"></div><div class="sw-lbl">Magenta<br>Creativity</div><div class="sw-hex">#7A2A5F</div></div>
    <div class="swatch"><div class="sw" style="background:#b8901f;"></div><div class="sw-lbl">Gold<br>Wisdom</div><div class="sw-hex">#B8901F</div></div>
    <div class="swatch"><div class="sw" style="background:#f8f6fc;border:1px solid #ddd6f0;"></div><div class="sw-lbl">Lavender<br>Background</div><div class="sw-hex">#F8F6FC</div></div>
    <div class="swatch"><div class="sw" style="background:#1a1030;"></div><div class="sw-lbl">Dark<br>Text</div><div class="sw-hex">#1A1030</div></div>
  </div>
  <div style="margin-top:52px;">
    <p class="overline">Type System</p>
    <h2 class="st">Typography <span class="ap">System</span></h2>
    <p class="bt" style="max-width:560px;margin-top:10px;">Two serif families build a rich, humanist visual hierarchy -- moving away from the cold corporate sans-serif style to connect with the warmth of the therapeutic space.</p>
    <div class="type-spec">
      <div class="trow"><div class="tm">Display / H1 -- Playfair Display 700</div><div class="sp1">Espacio MAT</div></div>
      <div class="trow"><div class="tm">Headings -- Playfair Display 600</div><div class="sp2">Personal Transformation</div></div>
      <div class="trow"><div class="tm">Body / Paragraphs -- Lora Regular</div><div class="sp3">A holistic fusion of Gestalt Psychology and Ontological Coaching.</div></div>
      <div class="trow"><div class="tm">UI / Labels -- Inter 500</div><div class="sp4">PHILOSOPHY - SERVICES - CONTACT - PROCESS</div></div>
    </div>
  </div>
</div></div>
</div>

<div class="page"><div class="section">
  <p class="overline">04 - The Journey</p>
  <h2 class="st">The Transformation <span class="ap">Process</span></h2>
  <p class="bt" style="max-width:580px;margin-top:10px;">The site communicates the therapeutic process across three steps, from awareness to transformative action.</p>
  <div class="proc-row">
    <div class="proc-card" style="border-color:#c9b8f5;background:#faf8ff;">
      <div class="pc-step" style="color:var(--purple-md);">Step 1</div>
      <div class="pc-ico" style="background:#ede8f9;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b47b8" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg></div>
      <div class="pc-title">Awareness</div>
      <div class="pc-sub" style="color:var(--purple-md);">Psychotherapy Process</div>
      <div class="pc-desc">Through Gestalt psychology, we guide clients to become aware of their patterns, emotions and beliefs.</div>
    </div>
    <div class="proc-card" style="border-color:#fde8c0;background:#fffbf5;">
      <div class="pc-step" style="color:var(--orange);">Step 2</div>
      <div class="pc-ico" style="background:#fef3c7;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8680a" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
      <div class="pc-title">Action Plan</div>
      <div class="pc-sub" style="color:var(--orange);">Coaching Process</div>
      <div class="pc-desc">We co-design a concrete action plan to move toward goals with clarity and purpose.</div>
    </div>
    <div class="proc-card" style="border-color:#b8d8c4;background:#f6fbf7;">
      <div class="pc-step" style="color:var(--green);">Step 3</div>
      <div class="pc-ico" style="background:#e8f5ec;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3d6b4a" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
      <div class="pc-title">Transformation</div>
      <div class="pc-sub" style="color:var(--green);">Discover Your Mission</div>
      <div class="pc-desc">Integrate both processes to uncover your unique gifts and launch your life project.</div>
    </div>
  </div>
</div></div>

<hr class="divider" />

<div style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
<div class="page"><div class="section">
  <p class="overline">05 - UI Components</p>
  <h2 class="st">Services -- <span class="ap">Accordion</span></h2>
  <p class="bt" style="max-width:560px;margin-top:10px;">An accordion reduces cognitive overload. Users explore each service at their own pace without feeling overwhelmed, reinforcing the calm the center aims to transmit.</p>
  <div class="acc-list">
    <div class="acc-item open">
      <div class="acc-left"><div class="acc-dot" style="background:var(--purple-md);"></div><div><div class="acc-ttl">Gestalt Psychotherapy</div><div class="acc-desc">Individual sessions focused on the here and now, awareness and emotional integration.</div></div></div>
      <div class="acc-chev up"></div>
    </div>
    <div class="acc-item"><div class="acc-left"><div class="acc-dot" style="background:var(--orange);"></div><div><div class="acc-ttl">Ontological Coaching</div></div></div><div class="acc-chev"></div></div>
    <div class="acc-item"><div class="acc-left"><div class="acc-dot" style="background:var(--green);"></div><div><div class="acc-ttl">Transformation Programme</div></div></div><div class="acc-chev"></div></div>
    <div class="acc-item"><div class="acc-left"><div class="acc-dot" style="background:var(--magenta);"></div><div><div class="acc-ttl">Group Workshops</div></div></div><div class="acc-chev"></div></div>
    <div class="acc-item"><div class="acc-left"><div class="acc-dot" style="background:var(--gold);"></div><div><div class="acc-ttl">Project Mentoring</div></div></div><div class="acc-chev"></div></div>
  </div>
</div></div>
</div>

<div class="page"><div class="section">
  <p class="overline">06 - The Team</p>
  <h2 class="st">Who <span class="ap">We Are</span></h2>
  <p class="bt" style="max-width:580px;margin-top:10px;">Team cards combine real photography with serif typography to convey closeness and professionalism.</p>
  <div class="team-grid">
    <div class="team-card">
      <div class="team-img"><img src="FOTOALE_SRC" alt="Maria Alejandra Torroija" /></div>
      <div class="team-info"><div class="team-name">Ma. Alejandra Torroija</div><div class="team-role">Gestalt Psychologist - Ontological Coach</div></div>
    </div>
    <div class="team-card">
      <div class="team-img"><img src="AGNES_SRC" alt="Agnes Landi" /></div>
      <div class="team-info"><div class="team-name">Agnes Landi</div><div class="team-role">General Coordinator - Yoga Instructor</div></div>
    </div>
    <div class="team-card">
      <div class="team-img"><div class="team-placeholder"></div></div>
      <div class="team-info"><div class="team-name">Marian Rossi</div><div class="team-role">Yoga - Ayurvedic Massage</div></div>
    </div>
  </div>
</div></div>

<hr class="divider" />

<div style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
<div class="page"><div class="section">
  <p class="overline">07 - Courses and Workshops</p>
  <h2 class="st">Learning <span class="ao">Spaces</span></h2>
  <p class="bt" style="max-width:560px;margin-top:10px;">Course cards use a full-bleed image header for immediate visual impact with a smooth scale hover effect.</p>
  <div class="course-grid">
    <div class="course-card">
      <div class="course-img"><img src="LIDERAZGO_SRC" alt="Human Leadership Course" /><div class="course-badge" style="background:rgba(107,71,184,0.88);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div></div>
      <div class="course-body"><div class="course-title">Human Leadership</div><div class="course-desc">Executive coaching, effective communication, conscious leadership and healthy organizational cultures.</div></div>
    </div>
    <div class="course-card">
      <div class="course-img"><img src="CUENCOS_SRC" alt="Tibetan bowls" /><div class="course-badge" style="background:rgba(200,104,10,0.88);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div></div>
      <div class="course-body"><div class="course-title">Experiential Workshops</div><div class="course-desc">Tibetan bowls, meditation and body work for deep self-knowledge.</div></div>
    </div>
    <div class="course-card">
      <div class="course-img"><img src="CLASES_SRC" alt="Weekly classes" /><div class="course-badge" style="background:rgba(61,107,74,0.88);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></div>
      <div class="course-body"><div class="course-title">Weekly Classes</div><div class="course-desc">Regular practice sessions: Gestalt, conscious movement and group dynamics.</div></div>
    </div>
  </div>
</div></div>
</div>

<div class="page"><div class="section">
  <p class="overline">08 - Design Decisions</p>
  <h2 class="st">Why These <span class="ag">Choices?</span></h2>
  <div class="two" style="margin-top:28px;gap:40px;">
    <div class="dec-list">
      <div class="dec-item"><div class="dec-ico" style="background:var(--purple-lt);">&#9670;</div><div><div class="dec-title">100% Serif Typography</div><div class="dec-desc">Playfair Display + Lora convey warmth and intellectual depth -- moving away from cold corporate style to connect with the therapeutic nature of the space.</div></div></div>
      <div class="dec-item"><div class="dec-ico" style="background:var(--orange-lt);">&#9728;</div><div><div class="dec-title">Mandala-derived Palette</div><div class="dec-desc">All 5 colors were extracted from the mandala logo using oklch() to ensure the site is a faithful visual extension of the brand's identity.</div></div></div>
      <div class="dec-item"><div class="dec-ico" style="background:var(--green-lt);">&#8594;</div><div><div class="dec-title">Linear Narrative Flow</div><div class="dec-desc">Impact, understanding, team, process, services, conversion. Each section builds trust progressively, mirroring the therapeutic journey itself.</div></div></div>
    </div>
    <div class="dec-list">
      <div class="dec-item"><div class="dec-ico" style="background:var(--surface);border:1px solid var(--border);">&#9776;</div><div><div class="dec-title">Accordion for Services</div><div class="dec-desc">Reduces cognitive overload. Users explore at their own pace without feeling overwhelmed, reinforcing the sense of calm the center aims to transmit.</div></div></div>
      <div class="dec-item"><div class="dec-ico" style="background:#e8f8ed;">&#9825;</div><div><div class="dec-title">Single CTA: WhatsApp</div><div class="dec-desc">Instead of a contact form, a WhatsApp button was chosen. For people seeking therapeutic support, direct conversation builds trust far more effectively.</div></div></div>
      <div class="dec-item"><div class="dec-ico" style="background:#f0ebff;">&#8734;</div><div><div class="dec-title">Auto-scroll Gallery</div><div class="dec-desc">An infinite loop carousel that pauses on hover. Showcases the physical space fluidly without requiring any interaction from the user.</div></div></div>
    </div>
  </div>
</div></div>

<hr class="divider" />

<div style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
<div class="page"><div class="section">
  <p class="overline">09 - Tech Stack</p>
  <h2 class="st">Technologies <span class="ap">Used</span></h2>
  <p class="bt" style="max-width:560px;margin-top:10px;">A modern stack focused on performance, SEO and long-term maintainability. Fully typed with TypeScript and optimised for Core Web Vitals.</p>
  <div class="tech-row">
    <div class="tech-pill"><span class="td" style="background:#1a1a1a;"></span>Next.js 15</div>
    <div class="tech-pill"><span class="td" style="background:#3b82f6;"></span>TypeScript</div>
    <div class="tech-pill"><span class="td" style="background:#06b6d4;"></span>Tailwind CSS v4</div>
    <div class="tech-pill"><span class="td" style="background:#ef4444;"></span>Framer Motion</div>
    <div class="tech-pill"><span class="td" style="background:#6366f1;"></span>Shadcn/UI</div>
    <div class="tech-pill"><span class="td" style="background:#22c55e;"></span>Vercel</div>
    <div class="tech-pill"><span class="td" style="background:#f59e0b;"></span>Vercel Analytics</div>
    <div class="tech-pill"><span class="td" style="background:#4285f4;"></span>Google Analytics</div>
  </div>
</div></div>
</div>

<div class="dark-sec">
  <div class="dark-inner">
    <p class="overline" style="color:rgba(255,255,255,0.35);">10 - Outcomes</p>
    <h2 style="font-size:38px;font-weight:700;color:white;margin-bottom:10px;">What Was <span style="color:#c9b8f5;">Achieved</span></h2>
    <p style="font-size:16px;color:rgba(255,255,255,0.50);max-width:520px;line-height:1.75;font-family:Georgia,serif;">A website that balances emotion with function, art with conversion.</p>
    <div class="res-grid">
      <div class="res-card"><div class="res-num" style="color:#c9b8f5;">11</div><div class="res-desc">Interconnected<br>sections</div></div>
      <div class="res-card"><div class="res-num" style="color:#f0d98a;">100%</div><div class="res-desc">Animated<br>components</div></div>
      <div class="res-card"><div class="res-num" style="color:#a8d4b2;">5</div><div class="res-desc">Colors in the<br>visual system</div></div>
      <div class="res-card"><div class="res-num" style="color:#c9b8f5;">2</div><div class="res-desc">100% serif<br>type families</div></div>
      <div class="res-card"><div class="res-num" style="color:#f0d98a;">1</div><div class="res-desc">Direct CTA<br>via WhatsApp</div></div>
      <div class="res-card"><div class="res-num" style="color:#a8d4b2;">&#8734;</div><div class="res-desc">Auto-scroll<br>gallery loop</div></div>
    </div>
  </div>
</div>

<div class="page"><div class="section">
  <p class="overline">11 - Credits</p>
  <div class="two" style="align-items:center;">
    <div>
      <h2 class="st">About the <span class="ap">Project</span></h2>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:18px;">
        <p class="bt"><strong style="color:var(--text);">Client:</strong> Espacio MAT -- Holistic center for Gestalt Psychology and Ontological Coaching, Argentina.</p>
        <p class="bt"><strong style="color:var(--text);">Agency:</strong> ViBolab -- Web development and digital design.</p>
        <p class="bt"><strong style="color:var(--text);">Scope:</strong> UI design, frontend development, design system, Vercel deploy with integrated Analytics.</p>
        <p class="bt"><strong style="color:var(--text);">Deploy:</strong> Vercel + Vercel Analytics + Google Analytics.</p>
      </div>
    </div>
    <div>
      <div style="background:var(--surface);border-radius:26px;padding:36px;border:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:22px;">
          <img src="LOGO_SRC" alt="Logo" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--border);" />
          <div>
            <div style="font-size:22px;font-weight:700;color:var(--text);">Espacio <span style="color:var(--purple-md);">MAT</span></div>
            <div class="sans" style="font-size:11px;color:var(--muted);">Gestalt Psychology -- Ontological Coaching</div>
          </div>
        </div>
        <p style="font-size:16px;color:var(--muted);font-style:italic;line-height:1.75;">"The only real voyage of discovery consists not in seeking new landscapes, but in having new eyes."</p>
        <p class="sans" style="margin-top:12px;font-size:11px;color:#9e94b8;">-- Marcel Proust</p>
      </div>
    </div>
  </div>
</div></div>

<div class="proj-footer">
  <p>Espacio MAT -- Web Design -- 2025 -- ViBolab</p>
  <p style="margin-top:5px;">Made with IBM Bob</p>
</div>

</body>
</html>
"@

$html = $html.Replace('ESP5_SRC',      $esp5)
$html = $html.Replace('LOGO_SRC',      $logo)
$html = $html.Replace('ESP1_SRC',      $esp1)
$html = $html.Replace('ESP2_SRC',      $esp2)
$html = $html.Replace('ESP3_SRC',      $esp3)
$html = $html.Replace('CLASES_SRC',    $clases)
$html = $html.Replace('FOTOALE_SRC',   $fotoale)
$html = $html.Replace('AGNES_SRC',     $agnes)
$html = $html.Replace('LIDERAZGO_SRC', $liderazgo)
$html = $html.Replace('CUENCOS_SRC',   $cuencos)

[System.IO.File]::WriteAllText(
  [System.IO.Path]::GetFullPath('public\behance-case-study-en.html'),
  $html,
  [System.Text.Encoding]::UTF8
)

$size = [math]::Round([System.IO.File]::ReadAllBytes('public\behance-case-study-en.html').Length / 1024, 0)
Write-Host "Done -- public\behance-case-study-en.html ($size KB)"
