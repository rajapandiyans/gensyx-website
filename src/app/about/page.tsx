import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Rocket, Users } from 'lucide-react'; // Icons for mission, vision, team

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold text-center mb-12 animate-subtle-fade-in text-primary">About GenSyx Solutions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="animate-subtle-slide-up shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="text-accent" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We strive to be the catalyst for our clients' digital success stories.
            </p>
          </CardContent>
        </Card>
        <Card className="animate-subtle-slide-up shadow-md" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Rocket className="text-secondary" /> Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be a leading digital services provider, recognized for our creativity, technical excellence, and commitment to client success. We envision a future where businesses of all sizes can leverage the power of digital technology to achieve their full potential.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-subtle-slide-up shadow-lg" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
             <Users className="text-primary" /> Company Background
          </CardTitle>
          <CardDescription>Pioneering Digital Excellence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-base">
          <p>
            Founded on the principles of innovation and client-centricity, GenSyx Solutions emerged from a passion for leveraging technology to solve real-world business challenges. Our journey began with a small team of dedicated developers and marketers who shared a common goal: to deliver exceptional digital experiences.
          </p>
          <p>
            Over the years, we have grown into a comprehensive digital services agency, constantly adapting to the ever-evolving digital landscape. We pride ourselves on staying ahead of the curve, mastering new technologies, and refining our strategies to ensure our clients receive the best possible outcomes.
          </p>
          <p>
            Our expertise spans web development, search engine optimization, brand building, digital marketing, social media management, and more. We believe in building strong partnerships with our clients, working collaboratively to understand their unique needs and deliver tailored solutions that exceed expectations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
