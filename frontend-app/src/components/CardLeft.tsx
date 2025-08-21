// src/components/CardLeft.tsx
import React from "react";
import "./CardLeft.css";

type CardLeftProps = {
  title: string;
};

export default function CardLeft({ title }: CardLeftProps) {
  return (
    <div className="card-left">
      <h2>{title}</h2>
    </div>
  );
}
