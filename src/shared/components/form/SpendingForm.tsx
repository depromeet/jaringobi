import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useSuspenseUserChallengeList } from '@/features/record/queries';
import { useAddSpendingMutation } from '@/features/spending/queries';
import { cn } from '@/lib/utils';
import { IconAdd, IconCheck } from '@/public/svgs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form';
import { memoMaxLength } from '@/shared/constant';
import { ImageInfo } from '@/shared/types/user';

import { Button } from '../button';
import { ChipGroup } from '../chip';
import { Input } from '../input';
import { Label } from '../label';
import { TextInput } from '../text-input';
import { Textarea } from '../textarea';

import { spendSchema } from './schema';

const images = [
  { path: '/images/low', alt: 'low' },
  { path: '/images/medium', alt: 'medium' },
  { path: '/images/high', alt: 'high' },
];

export default function SpendingForm() {
  const { data: challengeList } = useSuspenseUserChallengeList();
  const addSpending = useAddSpendingMutation();
  const [poorRoom, setPoorRoom] = useState('');
  const [selected, setSelected] = useState<null | number>(null);
  const [image, setImage] = useState<ImageInfo>({
    imageUrl: '',
  });
  const form = useForm<z.infer<typeof spendSchema>>({
    resolver: zodResolver(spendSchema),
    defaultValues: {
      price: 0,
      title: '',
      memo: '',
    },
  });
  const memo = form.watch('memo');

  const onSubmit = (values: z.infer<typeof spendSchema>) => {
    console.log(values);
    addSpending.mutate({
      ...values,
      poorRoom,
      imageInfo: image,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({
      image: file,
      imageUrl: url,
    });
  };

  return (
    <Form {...form}>
      <ChipGroup
        className="mb-4"
        initialChips={challengeList?.result.participatedChallenges[0].title}
        onChange={setPoorRoom}
      >
        {challengeList?.result.participatedChallenges.map((challenge) => (
          <ChipGroup.Chip key={challenge.challengeId} value={challenge.title}>
            {challenge.title}
          </ChipGroup.Chip>
        ))}
      </ChipGroup>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex items-center gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      가격
                    </h4>
                    <p className="text-primary-dark">*</p>
                  </div>
                </FormLabel>
                <FormControl>
                  <TextInput
                    type="number"
                    classNames={{
                      input: 'text-right',
                    }}
                    className="w-full"
                    rightSection={<span>원</span>}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4 ">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex items-center gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      지출명
                    </h4>
                    <p className="text-primary-dark">*</p>
                  </div>
                </FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="지출을 입력해주세요"
                    className="w-full"
                    maxLength={16}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <div className="flex flex-col items-start gap-y-2">
          <h4 className="font-caption-medium-lg font-semibold">사진</h4>
          {image.imageUrl ? (
            <div className="relative h-24 w-24">
              <Image
                src={image.imageUrl}
                alt="image"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <Label
              htmlFor="picture"
              className="flex h-[84px] w-[84px] items-center justify-center rounded-lg bg-gray-10"
            >
              <IconAdd className="h-4 w-4 text-gray-50" />
              {/* 앨범에서 선택 */}
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Label>
          )}
        </div>
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      메모
                    </h4>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-y-4 rounded-lg bg-gray-10 p-4">
                    <Textarea
                      placeholder="메모를 입력해주세요"
                      className="w-full"
                      maxLength={16}
                      {...field}
                    />
                    <span className="font-body-regular-sm text-right text-gray-50">
                      {memo ? memo.length : 0} / {memoMaxLength}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <div>
          <h4 className="font-caption-medium-lg font-semibold">내 지출 평가</h4>
          <div className="flex justify-center gap-x-5 pt-5">
            <IconCheck className=" h-4 w-4" />
            {images.map((image, index) => (
              <div key={index} className="relative">
                {index === selected && (
                  <Image
                    src="/images/check.png"
                    width={24}
                    height={24}
                    alt="check"
                    className="absolute right-0 top-0"
                  />
                )}
                <Image
                  onClick={() => setSelected(index)}
                  className={cn('cursor-pointer rounded-sm')}
                  src={`${image.path}${index === selected ? '-check' : ''}.png`}
                  width={64}
                  height={64}
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg">
          완료
        </Button>
      </form>
    </Form>
  );
}
