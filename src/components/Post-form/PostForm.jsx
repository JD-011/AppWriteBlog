import React, {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, Input, Select, RTE} from "../index.js"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import storageServices from "../../appwrite/storage.js";
import dbServices from "../../appwrite/CRUD.js";
import {getPosts} from "../../store/postSlice.js";

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? await storageServices.uploadFile(data.image[0]) : null;
            if(file){
                 await storageServices.deleteFile(post.featuredImage);
            }
            const dbPost = await dbServices.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }else{
            const file = data.image[0] ? await storageServices.uploadFile(data.image[0]) : null;
            if(file){
                const dbPost = await dbServices.createPost({
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    userId: userData.$id
                });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        dispatch(getPosts())
    }

    const slugTransform = useCallback((val) => {
        if(val && typeof val === 'string')
            return val
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-');
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true});
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageServices.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;