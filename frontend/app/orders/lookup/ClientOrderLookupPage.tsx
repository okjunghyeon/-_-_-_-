"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

const orderLookupSchema = z.object({
    orderId: z.string().regex(/^\d+$/, {message: "주문번호는 숫자만 입력 가능합니다."}),
    password: z.string().min(4, {message: "비밀번호는 최소 4자 이상이어야 합니다."}),
});

const ClientOrderLookupPage = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(orderLookupSchema),
        defaultValues: {
            orderId: "",
            password: "",
        },
    });

    const onSubmit = async (values: { orderId: string; password: string }) => {
        sessionStorage.setItem("orderPassword", JSON.stringify(values.password));

        router.push(`/orders/${values.orderId}`);
    };

    return (
        <Card className="max-w-md m-auto p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">주문 조회</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="orderId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>주문번호</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="주문번호 입력"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="비밀번호 입력"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        조회
                    </Button>
                </form>
            </Form>
        </Card>
    );
};

export default ClientOrderLookupPage;