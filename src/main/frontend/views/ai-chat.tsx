import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
// Using REST API instead of Hilla endpoints
import { useTranslation } from '../i18n';
import { Send, Bot, User, Code, Database, GitBranch, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export const config: ViewConfig = {
  menu: {
    title: 'AI Chat',
    icon: 'vaadin:chat',
    order: 2,
  },
  loginRequired: true,
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AiChatView() {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('CLAUDE');

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Get CSRF token
      const csrfToken = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');
      const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (csrfToken && csrfHeader) {
        headers[csrfHeader] = csrfToken;
      }
      
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: input, provider: selectedProvider }),
        credentials: 'same-origin',
      });
      
      const responseText = await response.text();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCurrentProject = async () => {
    const projectAnalysisPrompt = 
      "Please analyze the current Vaadin + shadcn/ui project structure and provide insights about:\n" +
      "1. Architecture and design patterns\n" +
      "2. Code quality and best practices\n" +
      "3. Potential improvements\n" +
      "4. Security considerations";
    
    setInput(projectAnalysisPrompt);
  };

  const analyzeDatabaseSchema = async () => {
    const dbAnalysisPrompt = 
      "Please analyze the current database schema and provide insights about:\n" +
      "1. Table structure and relationships\n" +
      "2. Data model design\n" +
      "3. Potential optimizations\n" +
      "4. Missing indexes or constraints";
    
    setInput(dbAnalysisPrompt);
  };

  const queryDatabase = async () => {
    const queryPrompt = 
      "I want to query the database. Please help me write SQL queries to:\n" +
      "1. Explore the data\n" +
      "2. Find specific information\n" +
      "3. Generate reports\n" +
      "Remember: Only SELECT queries are allowed for security.";
    
    setInput(queryPrompt);
  };

  return (
    <main className="space-y-6 h-full flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>AI Chat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{i18n.ai.title}</h1>
          <p className="text-muted-foreground">{i18n.ai.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CLAUDE">Claude (Anthropic)</SelectItem>
              <SelectItem value="AZURE_OPENAI">Azure OpenAI</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button onClick={analyzeCurrentProject} variant="outline" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {i18n.ai.analyzeProject}
            </Button>
            <Button onClick={analyzeDatabaseSchema} variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Analyze DB
            </Button>
            <Button onClick={queryDatabase} variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Query DB
            </Button>
          </div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Code Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{i18n.ai.startConversation}</p>
                <p className="text-sm">{i18n.ai.askAbout}</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0">
                    {message.sender === 'user' ? (
                      <User className="h-6 w-6 p-1 bg-primary text-primary-foreground rounded-full" />
                    ) : (
                      <Bot className="h-6 w-6 p-1 bg-secondary text-secondary-foreground rounded-full" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2">
                  <Bot className="h-6 w-6 p-1 bg-secondary text-secondary-foreground rounded-full" />
                  <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={i18n.ai.placeholder}
              className="flex-1 min-h-[60px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              disabled={loading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || loading}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}