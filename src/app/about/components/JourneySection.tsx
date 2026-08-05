import React from 'react';
import Link from 'next/link';
import { PageSection } from '@/components/ui/layout/PageSection';
import { ContentGrid } from '@/components/ui/layout/ContentGrid';
import { Stack } from '@/components/ui/layout/Stack';
import { Cluster } from '@/components/ui/layout/Cluster';
import { Heading } from '@/components/ui/text/Heading';
import { Text } from '@/components/ui/text/Text';
import { Button } from '@/components/ui/button/Button';
import { JourneyData } from '../types';

export function JourneySection({ data }: { data: JourneyData }) {
  return (
    <PageSection spacing="comfortable" className="bg-slate-50 relative overflow-hidden">
      
      {/* Decorative background curve */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50" />
      <div className="absolute top-40 left-1/2 w-[200%] aspect-[4/1] -translate-x-1/2 rounded-[100%] border-t border-blue-100" aria-hidden />

      <ContentGrid columns={{ base: 1, lg: 3 }} gap="xl" className="relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-1">
          <Stack gap="lg" className="max-w-md">
            <Stack gap="sm">
              <Text as="p" variant="small" weight="medium" className="uppercase tracking-widest text-blue-700">
                {data.kicker}
              </Text>
              <Heading level={2} className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {data.title.split('Purpose').map((part, i, arr) => 
                  i < arr.length - 1 ? <React.Fragment key={i}>{part}<span className="text-blue-700">Purpose.</span></React.Fragment> : part
                )}
              </Heading>
              <Text variant="body" className="text-gray-600 mt-2">
                {data.description}
              </Text>
            </Stack>
            
            <div>
              <Button as={Link} href={data.cta.href} variant="outline">
                {data.cta.label}
              </Button>
            </div>
          </Stack>
        </div>

        {/* Right Column - Timeline */}
        <div className="lg:col-span-2 overflow-hidden relative">
          {/* Horizontal timeline line (desktop) */}
          <div className="hidden lg:block absolute top-[11px] left-0 right-0 h-px bg-blue-100 z-0" />
          
          {/* Vertical timeline line (mobile) */}
          <div className="block lg:hidden absolute top-3 bottom-0 left-[11px] w-px bg-blue-100 z-0" />

          <Cluster gap="lg" className="flex-col lg:flex-row flex-nowrap overflow-x-auto pb-8 items-start snap-x snap-mandatory lg:overflow-visible relative z-10">
            {data.milestones.map((milestone, i) => (
              <Stack key={i} gap="md" className="min-w-[240px] sm:min-w-[280px] lg:min-w-[200px] snap-start relative pt-0 lg:pt-0 pl-10 lg:pl-0">
                
                {/* Timeline node */}
                <div className="absolute lg:static top-0 left-0 lg:mb-6 w-6 h-6 rounded-full bg-blue-50 border-[6px] border-white shadow-sm flex items-center justify-center z-10 lg:mx-auto">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                </div>

                <Stack gap="xs" className="text-left lg:text-center mt-1 lg:mt-0">
                  <Text variant="small" weight="bold" className="text-blue-700">
                    {milestone.year}
                  </Text>
                  <Heading level={3} className="text-lg font-bold text-gray-900">
                    {milestone.title}
                  </Heading>
                  <Text variant="caption" className="text-gray-500 leading-relaxed mb-4">
                    {milestone.description}
                  </Text>
                  
                  <div className="mt-auto w-32 h-32 lg:w-40 lg:h-40 mx-0 lg:mx-auto relative rounded-full bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
                    <img src={milestone.image} alt={milestone.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                </Stack>
              </Stack>
            ))}
          </Cluster>
        </div>

      </ContentGrid>
    </PageSection>
  );
}
