PGDMP     +                    y            postgres    12.6    13.2     {           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            |           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            }           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ~           1262    13318    postgres    DATABASE     l   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    2942            ?            1259    26182    images    TABLE     ?   CREATE TABLE public.images (
    id integer DEFAULT nextval('public.images_id_seq'::regclass),
    imageid integer,
    alt character varying(500),
    src character varying(1000),
    createdat timestamp without time zone,
    createdby integer
);
    DROP TABLE public.images;
       public         heap    postgres    false            ?
           2606    26196    images imageidOfrgID    FK CONSTRAINT     ?   ALTER TABLE ONLY public.images
    ADD CONSTRAINT "imageidOfrgID" FOREIGN KEY (imageid) REFERENCES public.productmaster(id) NOT VALID;
 @   ALTER TABLE ONLY public.images DROP CONSTRAINT "imageidOfrgID";
       public          postgres    false    241           