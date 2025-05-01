import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Rocket, Users, Building } from 'lucide-react'; // Icons for mission, vision, team, background

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 perspective-1000"> {/* Add perspective */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 animate-fade-in-down text-primary">
        About GenSyx Solutions
      </h1>

      {/* Mission & Vision Cards with 3D Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
        <Card className="card-base card-hover animate-subtle-slide-up transform-style-3d transition-transform duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
              <Target className="text-accent h-8 w-8" strokeWidth={1.5} /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              To empower businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We strive to be the catalyst for our clients' digital success stories.
            </p>
          </CardContent>
        </Card>
        <Card className="card-base card-hover animate-subtle-slide-up transform-style-3d transition-transform duration-500" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
              <Rocket className="text-secondary h-8 w-8" strokeWidth={1.5} /> Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              To be a leading digital services provider, recognized for our creativity, technical excellence, and commitment to client success. We envision a future where businesses of all sizes can leverage the power of digital technology to achieve their full potential.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Company Background Card with 3D Hover */}
      <Card className="card-base card-hover animate-subtle-scale-in transform-style-3d transition-transform duration-500" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl md:text-4xl">
             <Building className="text-primary h-9 w-9" strokeWidth={1.5} /> Company Background
          </CardTitle>
          <CardDescription className="text-lg md:text-xl mt-1">Pioneering Digital Excellence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
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
