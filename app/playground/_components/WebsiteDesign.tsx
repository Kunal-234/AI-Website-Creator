'use client'
import React, { useEffect, useRef, useState } from 'react'
import WebPageTools from './WebPageTools';

const HTML_CODE = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
        <title>AI Website Builder</title>

        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>

        <!-- Flowbite CSS & JS -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

        <!-- Font Awesome / Lucide -->
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

        <!-- Chart.js -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <!-- AOS -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

        <!-- GSAP -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

        <!-- Lottie -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

        <!-- Swiper -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

        <!-- Tippy.js -->
        <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
        <script src="https://unpkg.com/@popperjs/core@2"></script>
        <script src="https://unpkg.com/tippy.js@6"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>
    `

type Props = {
  generatedCode: string
}

function WebsiteDesign({ generatedCode }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState<'web' | 'mobile'>('web');


  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Write HTML into iframe
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(HTML_CODE);
    doc.close();

    // Attach listeners only AFTER iframe body exists
    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc || !doc.body) return;

      let hoverEL: HTMLElement | null = null;
      let selectedEL: HTMLElement | null = null;

      const handleMouseOver = (e: MouseEvent) => {
        if (selectedEL) return;
        const target = e.target as HTMLElement;

        if (hoverEL && hoverEL !== target) {
          hoverEL.style.outline = "";
        }

        hoverEL = target;
        hoverEL.style.outline = "2px dotted blue";
      };

      const handleMouseOut = () => {
        if (selectedEL) return;
        if (hoverEL) {
          hoverEL.style.outline = "";
          hoverEL = null;
        }
      };

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target as HTMLElement;

        if (selectedEL && selectedEL !== target) {
          selectedEL.style.outline = "";
          selectedEL.removeAttribute("contenteditable");
        }

        selectedEL = target;
        selectedEL.style.outline = "2px solid red";
        selectedEL.setAttribute("contenteditable", "true");
        selectedEL.focus();
      };

      const handleBlur = () => {
        if (selectedEL) {
          selectedEL.outerHTML;
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && selectedEL) {
          selectedEL.style.outline = "";
          selectedEL.removeAttribute("contenteditable");
          selectedEL = null;
        }
      };

      doc.body.addEventListener("mouseover", handleMouseOver);
      doc.body.addEventListener("mouseout", handleMouseOut);
      doc.body.addEventListener("click", handleClick);
      doc.addEventListener("keydown", handleKeyDown);

      // Cleanup
      return () => {
        doc.body.removeEventListener("mouseover", handleMouseOver);
        doc.body.removeEventListener("mouseout", handleMouseOut);
        doc.body.removeEventListener("click", handleClick);
        doc.removeEventListener("keydown", handleKeyDown);
      };
    };

    iframe.addEventListener("load", onLoad);

    return () => iframe.removeEventListener("load", onLoad);

  }, []);


  // Update website when user edits code
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    const root = doc.getElementById("root");
    if (root) {
      root.innerHTML = generatedCode
        .replaceAll("<!DOCTYPE html>", "")
        .replaceAll("<html>", "")
        .replaceAll("</html>", "");
    }
  }, [generatedCode]);

  return (
    <div className='p-5 w-full flex items-center flex-col'>
      <iframe
        ref={iframeRef}
        className={`${selectedScreenSize === 'web' ? 'w-full' : 'w-120'} h-[600px] border-2 rounded-xl`}
        sandbox="allow-scripts allow-same-origin"
      />
      <WebPageTools
        selectedScreenSize={selectedScreenSize}
        setSelectedScreenSize={(val) => setSelectedScreenSize(val)}
        generatedCode={generatedCode}
      />
    </div>
  );
}

export default WebsiteDesign;
