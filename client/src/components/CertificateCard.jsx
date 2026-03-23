import { memo } from "react";
import Card from "./Card";

function CertificateCard({ certificate, onOpen }) {
  return (
    <Card className="overflow-hidden p-0">
      <button type="button" onClick={onOpen} className="w-full text-left">
        <img
          src={certificate.imageUrl}
          alt={certificate.title}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="space-y-1 p-4">
          <h3 className="text-base font-semibold text-white">{certificate.title}</h3>
          <p className="text-sm text-subtle">{certificate.issuer}</p>
          <p className="text-xs text-slate-400">{certificate.date}</p>
        </div>
      </button>
    </Card>
  );
}

export default memo(CertificateCard);
