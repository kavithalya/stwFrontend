PGDMP     5    ;                y            postgres    12.6    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    13318    postgres    DATABASE     l   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            ?           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    2963            ?            1259    16828    productmaster    TABLE       CREATE TABLE public.productmaster (
    id integer DEFAULT nextval('public.productmaster_id_seq'::regclass) NOT NULL,
    name character varying(500) DEFAULT 'NULL::character varying'::character varying NOT NULL,
    departmentid integer,
    categoryid integer,
    brandid integer,
    linkid character varying(500) DEFAULT NULL::character varying,
    refid character varying(500) DEFAULT NULL::character varying,
    isvisible integer,
    description character varying(2000) DEFAULT NULL::character varying,
    descriptionshort character varying(2000) DEFAULT NULL::character varying,
    releasedate character varying(500) DEFAULT NULL::character varying,
    keywords character varying(500) DEFAULT NULL::character varying,
    title character varying(1000) DEFAULT NULL::character varying,
    isactive integer,
    taxcode character varying(500) DEFAULT NULL::character varying,
    metatagdescription character varying(2000) DEFAULT NULL::character varying,
    supplierid character varying(500) DEFAULT NULL::character varying,
    showwithoutstock character varying(20) DEFAULT NULL::character varying,
    adwordsremarketingcode character varying(50) DEFAULT NULL::character varying,
    lomadeecampaigncode character varying(500) DEFAULT NULL::character varying,
    score integer,
    "CreatedBy" integer,
    "CreatedAt" timestamp without time zone,
    price real,
    type character varying(255) DEFAULT NULL::character varying,
    collection character varying(255) DEFAULT NULL::character varying,
    brand character varying(255) DEFAULT NULL::character varying,
    stock integer,
    new character varying(255) DEFAULT NULL::character varying,
    sale character varying(255) DEFAULT NULL::character varying,
    discount character varying(255) DEFAULT NULL::character varying
);
 !   DROP TABLE public.productmaster;
       public         heap    postgres    false                       2606    24863 #   productmaster productmaster_primary 
   CONSTRAINT     p   ALTER TABLE ONLY public.productmaster
    ADD CONSTRAINT productmaster_primary PRIMARY KEY (id) INCLUDE (name);
 M   ALTER TABLE ONLY public.productmaster DROP CONSTRAINT productmaster_primary;
       public            postgres    false    236    236           