import { useForm } from "../../../auth/hooks/form/useForm";
import { searchSchema } from "../../../auth/schemas/searchSchema";


const useSearchScreen = () => {
    
    const form = useForm<typeof searchSchema>({
        schema: searchSchema,
        defaultValues: {
            search: '',
        },
        mode: 'onChange',
    });


    return {
        form,
    };
};

export default useSearchScreen;