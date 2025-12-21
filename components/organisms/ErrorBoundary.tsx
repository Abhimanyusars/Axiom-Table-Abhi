"use client";

import { Component, ReactNode } from "react";
import Button from "../atoms/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

