'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Button } from '../button'

SyntaxHighlighter.registerLanguage('javascript', js)

interface CodeBlockProps {
    code: string
    language?: string
}

export default function CodeBlock({ code = "var test=\"test\"", language = 'javascript' }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="relative rounded-lg overflow-hidden">
            <SyntaxHighlighter
                language={language}
                style={githubGist}
                customStyle={{
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    borderRadius: '0.5rem',
                }}
            >
                {code}
            </SyntaxHighlighter>
            <Button
                variant='outline'
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
            >
                {isCopied ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}